import axios from "axios";
import { API_URL } from "../constants/route";
import AxiosService from "./AxiosService";
import { ROUTE, HOUSE_ROUTE } from "../constants/route";
import { DEFAULT_ERROR_MESSAGE } from "../constants/message";
import { isValidData } from "../helper/helper";
import queryString from "query-string";
import _ from "lodash";

class HouseService extends AxiosService {
  // get house details with id
  getHouseDetail = async (houseId) => {
    try {
      const paramsString = queryString.stringify(houseId);
      const requestUrl = API_URL + `/houses/detail?${paramsString}`;
      const response = await axios.get(requestUrl);
      const houseDetail = _.get(response, "data.data");
      if (isValidData(houseDetail)) {
        return response.data;
      }
      return null;
    } catch (error) {
      // Check if error is catched by BE
      if (isValidData(error.response.data.message)) {
        return error.response.data;
      }
    }
    return { status: 500, message: DEFAULT_ERROR_MESSAGE };
  };

  // get recommended house with id
  getHouseRelated = async (houseId) => {
    try {
      const paramsString = queryString.stringify(houseId);
      const requestUrl = HOUSE_ROUTE.RELATED_HOUSE + `?${paramsString}`;
      const response = await axios.get(requestUrl);
      const house = _.get(response, "data.data.listHouseRecommend");
      // Validate response data
      if (isValidData(house)) {
        return response.data;
      }
    } catch (error) {
      // Check if error is catched by BE
      if (isValidData(error.response.data.message)) {
        return error.response.data;
      }
    }
    return { status: 500, message: DEFAULT_ERROR_MESSAGE };
  };

  // get list house
  getHouses = async (filter) => {
    try {
      const paramsString = queryString.stringify(filter);
      const requestUrl = ROUTE.SEARCH_PATH + `?${paramsString}`;
      const response = await axios.get(requestUrl);
      const house = _.get(response, "data.data");
      if (isValidData(house.listObject)) {
        return response.data;
      }
    } catch (error) {
      // Check if error is catched by BE
      if (isValidData(error.response.data.message)) {
        return error.response.data;
      }
    }
    return { status: 500, message: DEFAULT_ERROR_MESSAGE };
  };

  // get list houses for host
  getHouseForHost = async (accountId) => {
    try {
      const paramsString = queryString.stringify(accountId);
      const requestUrl = ROUTE.HOUSE_MANAGE + `?${paramsString}`;
      const response = await axios.get(requestUrl, { headers: this.token() });
      const house = _.get(response, "data");
      if (isValidData(house)) {
        return house;
      }
    } catch (error) {
      // Check if error is catched by BE
      if (isValidData(error.response.data.message)) {
        return error.response.data;
      }
    }
    return { status: 500, message: DEFAULT_ERROR_MESSAGE };
  };

  // deactive house with id
  deactiveHouse = async (houseid) => {
    try {
      const response = await axios.delete(
        API_URL + `/houses/deactiveHouse/${houseid}`,
        { headers: this.token() }
      );
      if (isValidData(response.data)) {
        return response.data;
      }
    } catch (error) {
      // Check if error is catched by BE
      if (isValidData(error.response.data.message)) {
        return error.response.data;
      }
    }
    return { status: 500, message: DEFAULT_ERROR_MESSAGE };
  };

  // hid or unhide house with id
  hiddenHouse = async (houseid) => {
    try {
      const response = await axios.get(
        API_URL + `/houses/unlistedHouse/${houseid}`,
        { headers: this.token() }
      );
      if (isValidData(response.data)) {
        return response.data;
      }
    } catch (error) {
      // Check if error is catched by BE
      if (isValidData(error.response.data.message)) {
        return error.response.data;
      }
    }
    return { status: 500, message: DEFAULT_ERROR_MESSAGE };
  };

  // block house (admin)
  blockHouse = async (houseid) => {
    try {
      const response = await axios.get(API_URL + `/houses/block/${houseid}`, {
        headers: this.token(),
      });
      if (isValidData(response.data)) {
        return response.data;
      }
    } catch (error) {
      // Check if error is catched by BE
      if (isValidData(error.response.data.message)) {
        return error.response.data;
      }
    }
    return { status: 500, message: DEFAULT_ERROR_MESSAGE };
  };

  addHouse = async (house) => {
    try {
      const response = await axios.post(
        `${HOUSE_ROUTE.CREATE_HOUSE}`,
        { ...house },
        { headers: this.token() }
      );
      // Validate response data
      if (isValidData(response.data)) {
        return response.data;
      }
    } catch (error) {
      // Check if error is catched by BE
      if (isValidData(error.response.data.message)) {
        return error.response.data;
      }
    }
    return { status: 500, message: DEFAULT_ERROR_MESSAGE };
  };
}

export default HouseService;

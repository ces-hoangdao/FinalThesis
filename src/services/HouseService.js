import axios from "axios";
import { API_URL } from "../constants/route";
import AxiosService from "./AxiosService";
import { ROUTE, HOUSE_ROUTE } from "../constants/route";
import { DEFAULT_ERROR_MESSAGE } from "../constants/message";
import isValidData from "../helper/helper";
import queryString from "query-string";

class HouseService extends AxiosService {
  getHouseDetail = async (houseId) => {
    try {
      const paramsString = queryString.stringify(houseId);
      const requestUrl = API_URL + `/houses/detail?${paramsString}`;
      const response = await axios.get(requestUrl);
      if (isValidData(response.data)) {
        return response.data;
      }
      return null;
    } catch (err) {
      return { status: 500, message: DEFAULT_ERROR_MESSAGE };
    }
  };

  getHouses = async (filter) => {
    try {
      const paramsString = queryString.stringify(filter);
      const requestUrl = ROUTE.SEARCH_PATH + `?${paramsString}`;
      const response = await axios.get(requestUrl);
      if (isValidData(response.data.listObject)) {
        return response.data.listObject;
      }
      return null;
    } catch (error) {
      return { status: 500, message: DEFAULT_ERROR_MESSAGE };
    }
  };

  getListHouseByUsername = async (username) => {
    try {
      const requestUrl = ROUTE.HOUSE_MANAGE + `/${username}`;
      const response = await axios.get(requestUrl);
      if (isValidData(response.data)) {
        return response.data;
      }
      return null;
    } catch (err) {
      return { status: 500, message: DEFAULT_ERROR_MESSAGE };
    }
  };

  deleteHouse = async (houseid) => {
    const response = await axios
      .delete(API_URL + `/houses/${houseid}`, { headers: this.token() })
      .then(() => {});
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

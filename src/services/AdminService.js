import { API_URL, ROUTE } from "../constants/route";
import AxiosService from "../services/AxiosService";
import {isValidData} from "../helper/helper";
import axios from "axios";
import queryString from "query-string";
import _ from "lodash";
import { DEFAULT_ERROR_MESSAGE } from "../constants/message";
class AdminService extends AxiosService {
  // Get list accounts
  getAccounts = async () => {
    try {
      const requestUrl = API_URL + `/accounts?`;
      const response = await axios.get(requestUrl, { headers: this.token() });
      if (isValidData(response.data.data.listObject)) {
        return response.data;
      }
      return null;
    } catch (err) {
      return null;
    }
  };

  // Get list house (admin)
  getAllHouse = async (accountId) => {
    try {
      const paramsString = queryString.stringify(accountId);
      const requestUrl = ROUTE.HOUSE_MANAGE + `host?${paramsString}`;
      const response = await axios.get(requestUrl, { headers: this.token() });
      if (isValidData(response.data)) {
        return response.data;
      }
      return null;
    } catch (err) {
      return null;
    }
  };

  ///suar trang thai put -> get
  banAccount = async (accountId) => {
    const requestUrl = API_URL + `/ban/${accountId}`;
    const response = await axios.get(requestUrl, { headers: this.token() });
    if (isValidData(response)) {
      return response.data;
    }
  };

  getStatistic = async () => {
    try {
      const requestUrl = API_URL + `/statisticsAdmin`;
      const response = await axios.get(requestUrl, { headers: this.token() });
      if (isValidData(response.data)) {
        return response.data;
      }
      return null;
    } catch (err) {
      return null;
    }
  };

  totalHouseMonthly = async (years) => {
    try {
      const requestUrl = API_URL + `/totalHouse/${years}`;
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
  
  monthlyRevenue = async (years) => {
    try {
      const requestUrl = API_URL + `/revenue/${years}`;
      const response = await axios.get(requestUrl, { headers: this.token() });
      const revenue = _.get(response, "data");
      if (isValidData(revenue)) {
        return revenue;
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

export default AdminService;

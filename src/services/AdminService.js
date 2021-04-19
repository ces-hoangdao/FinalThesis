import { API_URL, ROUTE } from "../constants/route";
import AxiosService from "../services/AxiosService";
import isValidData from "../helper/helper";
import axios from "axios";
import queryString from "query-string";

class AdminService extends AxiosService {
  constructor() {
    super();
  }
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
}

export default AdminService;

import axios from "axios";
<<<<<<< HEAD
import { API_URL, USER_ROUTE } from "../constants/route";
=======
import { USER_ROUTE, ROUTE, API_URL } from "../constants/route";
>>>>>>> dbeb381 ([US30]-admin refactor code, add statistic for admin, manager house and)
import { DEFAULT_ERROR_MESSAGE } from "../constants/message";
import AxiosService from "./AxiosService";
import {isValidData} from "../helper/helper";

class UserService extends AxiosService {
  getCurrentUser = async () => {
    try {
      const response = await axios.get(`${USER_ROUTE.GET_USER}`, {
        headers: this.token(),
      });
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

  editprofile = async (user) => {
    const { id, ...userData } = user;
    try {
      const response = await axios.put(
        `${USER_ROUTE.EDIT_INFOR}/${id}`,
        { ...userData },
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
<<<<<<< HEAD

  getStatisticOwner = async (accountId) => {
    const requestUrl = `${API_URL}/statisticOwner/${accountId}`;
    try {
      const response = await axios.get(requestUrl, { headers: this.token() });
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
=======
  getStatisticOwner = async (accountId) => {
    try {
      const requestUrl = API_URL + `/statisticOwner/${accountId}`;
      const response = await axios.get(requestUrl, { headers: this.token() });
      if (isValidData(response.data)) {
        return response.data;
      }
      return null;
    } catch (err) {
      return null;
    }
  };
  getAllUsers = async () => {
    try {
      const requestUrl = ROUTE.USER_PATH;
      const response = await axios.get(requestUrl, { headers: this.token() });
      if (isValidData(response.data)) {
        return response.data;
      }
      return null;
    } catch (err) {
      return null;
    }
>>>>>>> dbeb381 ([US30]-admin refactor code, add statistic for admin, manager house and)
  };
}



export default UserService;

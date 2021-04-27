import axios from "axios";
import { USER_ROUTE } from "../constants/route";
import { DEFAULT_ERROR_MESSAGE } from "../constants/message";
import AxiosService from "./AxiosService";
import isValidData from "../helper/helper";

class UserService extends AxiosService {
  getCurrentUser = async () => {
    try {
      const response = await axios.get(
        `${USER_ROUTE.GET_USER}`,
        { headers: this.token(), }
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
}

export default UserService;

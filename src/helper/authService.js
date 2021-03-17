import axios from "axios";
import jwt_decode from "jwt-decode";
import { ROUTE } from "../constants/route";
import apiConfig from "./apiConfig.service";

class authService extends apiConfig {
  constructor (){
    super();
  }
  //register Api
  register = async (email, username, password) => {
    return axios
      .post(ROUTE.REGISTER_PATH, {
        email,
        username,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          //success
        }
        return response.data;
      });
  };

  //Login Api
  login = async (usernameOrEmail, password) => {
    return axios
      .post(ROUTE.LOGIN_PATH, {
        usernameOrEmail,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data);
          const userInfo = jwt_decode(localStorage.getItem("token"));
          const isAdmin = userInfo.user.role === "admin";
          localStorage.setItem("username", userInfo.user.username);
          localStorage.setItem("isAdmin", isAdmin);
        }
        return response.data;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          //Not acticve yet
        }
      });
  };

  //Logout Api
  logout = async () => {
    const response = await axios.delete(ROUTE.LOGOUT_PATH, {
      headers: this.token(),
    });
    localStorage.clear();
    return response.data;
  };

  confirmcode = async (verifycode) => {
    return axios
      .post(ROUTE.CONFIRMCODE_PATH, {
        verifycode,
      })
      .then((response) => {
        //something act
      });
  };
}
export default authService;

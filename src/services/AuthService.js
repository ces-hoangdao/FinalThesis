import axios from "axios";
import jwt_decode from "jwt-decode";
import { ROUTE } from "../constants/route";
import AxiosService from "./AxiosService";
class AuthService extends AxiosService {
  // Create new account
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

  // Login
  login = async (usernameOrEmail, password) => {
    return axios
      .post(ROUTE.LOGIN_PATH, {
        usernameOrEmail,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data.data);
          const userInfo = jwt_decode(localStorage.getItem("token"));
          const isAdmin = userInfo.user.role === "admin";
          localStorage.setItem("userId", userInfo.user.userId);
          localStorage.setItem("username", userInfo.user.username);
          localStorage.setItem("isAdmin", isAdmin);
          localStorage.setItem("email", userInfo.user.email);
          localStorage.setItem("role" ,userInfo.user.role);
        }
        return response.data;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          //Not acticve yet
        }
      });
  };

  // Log out
  logout = async () => {
    axios.delete(
      ROUTE.LOGOUT_PATH,
      { headers: this.token(), }
    )
  };

  // Confirm code
  confirmCode = async (verifycode) => {
    return axios
      .post(ROUTE.CONFIRMCODE_PATH, {
        verifycode,
      })
      .then((response) => {
        //something act
      });
  };
}
export default AuthService;

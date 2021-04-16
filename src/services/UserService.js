import axios from "axios";
import { API_URL } from "../constants/route";
import { USER_ROUTE } from "../constants/route";
import AxiosService from "./AxiosService";

class UserService extends AxiosService {
  getCurrentUser = async () => {
    try {
      const response = await axios.get(USER_ROUTE.GET_USER, {
        headers: this.token(),
      });
      return response.data;
    } catch (err) {
      return null;
    }
  };

  editprofile = async (
    id,
    firstName,
    lastName,
    birthday,
    country,
    city,
    address
  ) => {
    return axios
      .put(
        `${USER_ROUTE.EDIT_INFOR}/${id}`,
        { firstName, lastName, birthday, country, city, address },
        { headers: this.token() }
      )
      .then((response) => {
        //something act
        window.location.reload();
      })
      .catch((error) => {
        //error
        console.log(error.response);
      });
  };
}

export default UserService;

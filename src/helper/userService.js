import axios from "axios";
import { API_URL } from "../constants/route";
import { ROUTE } from "../constants/route";
import ApiConfig from "./apiConfig.service";

class userService extends ApiConfig {
  constructor() {
    super();
  }
  editprofile = (
    password,
    firstname,
    lastname,
    birthday,
    country,
    city,
    address
  ) => {
    return axios
      .post(
        ROUTE.EDITPROFILE_PATH,
        { password, firstname, lastname, birthday, country, city, address },
        { headers: this.token() }
      )
      .then((response) => {
        //something act
        window.location.reload();
      });
  };
  loadhouse = async () => {
    const response = await axios.get(API_URL + "/houses?page=1&size=20 ");
    return response.data;
  };
}
export default userService;

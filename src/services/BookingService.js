import axios from "axios";
import { ROUTE } from "../constants/route";
import AxiosService from "./AxiosService";
import isValidData from "../helper/helper";
import queryString from "query-string";
import { DEFAULT_ERROR_MESSAGE } from "../constants/message";

class BookingService extends AxiosService {
  //booking services
  getBookingForCustomer = async (userId) => {
    try {
      const paramsString = queryString.stringify(userId);

      const requestUrl = ROUTE.BOOKING_PATH + `/customer?${paramsString}`;

      const response = await axios.get(requestUrl, {
        headers: this.token(),
      });
      if (isValidData(response.data)) {
        return response.data.data;
      }
      return null;
    } catch (err) {
      return null;
    }
  };

  getBookingsByHouseId = async (houseId) => {
    try {
      const response = await axios.get(
        ROUTE.BOOKING_PATH + `/house/${houseId}`,
        { headers: this.token() }
      );
      if (isValidData(response.data)) {
        return response.data.data;
      }
      return null;
    } catch (err) {
      return null;
    }
  };

  cancelBooking = async (idbooking) => {
    const response = await axios.get(
      ROUTE.BOOKING_PATH + `/cancelBooking/${idbooking}`,
      { headers: this.token() }
    );
  };

  // rating services

  getRatingByHouseId = async (houseId) => {
    try {
      const response = await axios.get(
        ROUTE.RATING_PATH + `/houses/${houseId}`
      );
      if (isValidData(response.data)) {
        return response.data.data;
      }
      return null;
    } catch (err) {
      return null;
    }
  };

  writeRating = async (idbooking, star, content) => {
    const response = await axios.post(
      ROUTE.RATING_PATH + `/write/${idbooking}`,
      { star, content },
      { headers: this.token() }
    );
    if (isValidData(response.data)) {
      return response.data.data;
    }
    return null;
  };

  editRating = async (idRating, star, content) => {
    try {
      const requestUrl = `${ROUTE.RATING_PATH}/${idRating}`;
      const response = await axios.put(
        requestUrl,
        { star, content },
        { headers: this.token() }
      );
      if (isValidData(response.data.data)) {
        return response.data.data;
      }
      return null;
    } catch (err) {
      return { status: 500, message: DEFAULT_ERROR_MESSAGE };
    }
  };
}

export default BookingService;

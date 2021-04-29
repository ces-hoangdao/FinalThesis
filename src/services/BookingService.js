import axios from "axios";
import { ROUTE } from "../constants/route";
import AxiosService from "./AxiosService";
import isValidData from "../helper/helper";
import queryString from "query-string";
import { DEFAULT_ERROR_MESSAGE } from "../constants/message";
import _ from "lodash";

class BookingService extends AxiosService {
  //booking services
  getBookingForCustomer = async (userId) => {
    try {
      const paramsString = queryString.stringify(userId);
      const requestUrl = ROUTE.BOOKING_PATH + `/customer?${paramsString}`;
      const response = await axios.get(requestUrl, {
        headers: this.token(),
      });
      const booking = _.get(response, "data.data");
      if (isValidData(booking)) {
        return booking;
      }
    } catch (error) {
      // Check if error is catched by BE
      if (isValidData(error.response.data.message)) {
        return error.response.data;
      }
    }
    return { status: 500, message: DEFAULT_ERROR_MESSAGE };
  };

  getBookingsByHouseId = async (houseId) => {
    try {
      const response = await axios.get(
        ROUTE.BOOKING_PATH + `/house/${houseId}`,
        { headers: this.token() }
      );
      const booking = _.get(response, "data.data");
      if (isValidData(booking)) {
        return booking;
      }
    } catch (error) {
      // Check if error is catched by BE
      if (isValidData(error.response.data.message)) {
        return error.response.data;
      }
    }
    return { status: 500, message: DEFAULT_ERROR_MESSAGE };
  };

  cancelBooking = async (idbooking) => {
    const response = await axios.get(
      ROUTE.BOOKING_PATH + `/cancelBooking/${idbooking}`,
      { headers: this.token() }
    );
  };

  writeRating = async (idbooking, star, content) => {
    const response = await axios.post(
      ROUTE.RATING_PATH + `/write/${idbooking}`,
      { star, content },
      { headers: this.token() }
    );
    const rating = _.get(response, "data.data");
    if (isValidData(rating)) {
      return rating;
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
      const rating = _.get(response, "data.data");
      if (isValidData(rating)) {
        return rating;
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

export default BookingService;

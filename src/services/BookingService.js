import axios from "axios";
import { ROUTE, BOOKING_ROUTE } from "../constants/route";
import AxiosService from "./AxiosService";
import { isValidData } from "../helper/helper";
import queryString from "query-string";
import { DEFAULT_ERROR_MESSAGE } from "../constants/message";
import _ from "lodash";

class BookingService extends AxiosService {
  createBooking = async (houseId, checkIn, checkOut) => {
    const requestUrl = `${BOOKING_ROUTE.CREATE_BOOOKING}/${houseId}`;
    try {
      const response = await axios.post(
        requestUrl,
        {
          dateCheckIn: checkIn.toLocaleDateString(),
          dateCheckOut: checkOut.toLocaleDateString(),
        },
        { headers: this.token() }
      );
      // Validate response data
      if (isValidData(response.data)) {
        return response.data;
      }
    } catch (error) {
      // Check if error is catched by BE
      if (error.response.data.message !== '') {
        return error.response.data;
      }
    }
    return { status: 500, message: DEFAULT_ERROR_MESSAGE };
  };

  //booking services
  getBookingForCustomer = async (userId) => {
    try {
      const paramsString = queryString.stringify(userId);
      const requestUrl = ROUTE.BOOKING_PATH + `/customer?${paramsString}`;
      const response = await axios.get(requestUrl, {
        headers: this.token(),
      });
      const booking = _.get(response, "data.data.listObject");
      if (isValidData(booking)) {
        return response.data;
      }
    } catch (error) {
      // Check if error is catched by BE
      if (error.response.data.message !== '') {
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
      if (error.response.data.message !== '') {
        return error.response.data;
      }
    }
    return { status: 500, message: DEFAULT_ERROR_MESSAGE };
  };

  cancelBooking = async (idbooking, click) => {
    try {
      const paramsString = queryString.stringify(click);
      const response = await axios.put(
        ROUTE.BOOKING_PATH + `/cancelBooking/${idbooking}?${paramsString}`,
        { click: false },
        { headers: this.token() }
      );
      if (isValidData(response.data)) {
        return response.data;
      }
    } catch (error) {
      // Check if error is catched by BE
      if (error.response.data.message !== '') {
        return error.response.data;
      }
    }
    return { status: 500, message: DEFAULT_ERROR_MESSAGE };
  };

  payment = async (id, click) => {
    try {
      const response = await axios.put(
        ROUTE.BOOKING_PATH + `/payment/${id}`,
        { click: false },
        { headers: this.token() }
      );
      if (isValidData(response.data)) {
        return response.data;
      }
    } catch (error) {
      // Check if error is catched by BE
      if (error.response.data.message !== '') {
        return error.response.data;
      }
    }
    return { status: 500, message: DEFAULT_ERROR_MESSAGE };
  }

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
      if (error.response.data.message !== '') {
        return error.response.data;
      }
    }
    return { status: 500, message: DEFAULT_ERROR_MESSAGE };
  };
}

export default BookingService;

import axios from "axios";
import { BOOKING_ROUTE } from "../constants/route";
import { DEFAULT_ERROR_MESSAGE } from "../constants/message";
import AxiosService from "./AxiosService";
import { isValidData } from "../helper/helper";

class BookingService extends AxiosService {
<<<<<<< HEAD
  createBooking = async (houseId, checkIn, checkOut) => {
    const requestUrl = `${BOOKING_ROUTE.CREATE_BOOOKING}/${houseId}`;
=======

  // Get list booking for user
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
      if (isValidData(error.response.data.message)) {
        return error.response.data;
      }
    }
    return { status: 500, message: DEFAULT_ERROR_MESSAGE };
  };

  // Get booking of house
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

  // Cancel a booking
  cancelBooking = async (idbooking) => {
    const response = await axios.get(
      ROUTE.BOOKING_PATH + `/cancelBooking/${idbooking}`,
      { headers: this.token() }
    );
  };

  // Create rating
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

  // Update rating
  editRating = async (idRating, star, content) => {
>>>>>>> b52b0ab ([US30]-admin- Update house card and booking management)
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
      if (isValidData(error.response.data.message)) {
        return error.response.data;
      }
    }
    return { status: 500, message: DEFAULT_ERROR_MESSAGE };
  };
}

export default BookingService;

import axios from "axios";
import { BOOKING_ROUTE } from "../constants/route";
import { DEFAULT_ERROR_MESSAGE } from "../constants/message";
import AxiosService from "./AxiosService";
import { isValidData } from "../helper/helper";

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
      if (isValidData(error.response.data.message)) {
        return error.response.data;
      }
    }
    return { status: 500, message: DEFAULT_ERROR_MESSAGE };
  };
}

export default BookingService;

import "./BookingHistory.css";
import Canceled from "./Canceled";
import Pending from "./Pending";
import Completed from "./Completed";
import { React, useState, useEffect } from "react";
import { Redirect } from "react-router";
import { Container, Tab, Tabs, Row, Form } from "react-bootstrap";
import BookingService from "../../services/BookingService";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { DEFAULT_ERROR_MESSAGE } from "../../constants/message";
import BookingCard from "../../components/BookingCard/BookingCard";

const BookingManage = () => {
  const [loading, setLoading] = useState(false);
  const accountId = localStorage.getItem("userId");
  const [bookings, setBookings] = useState([]);
  const [params, setParams] = useState({
    accountId: accountId,
    size: 20,
    page: 0,
    status: null,
  });

  console.log(bookings);
  useEffect(() => {
    setLoading(true);
    setBookings([]);
    new BookingService()
      .getBookingForCustomer(params)
      .then((response) => {
        if (response.status < 300) {
          console.log(response.data.listObject);
          setBookings(response.data.listObject);
          setLoading(false);
          NotificationManager.success(response.message);
        } else {
          NotificationManager.error(response.message);
          setLoading(false);
        }
      })
      .catch((error) => {
        NotificationManager.error(DEFAULT_ERROR_MESSAGE);
      });
  }, [params]);

  const isLogin = localStorage.getItem("token");

  if (isLogin == null) {
    return <Redirect to="/login"></Redirect>;
  }

  return (
    <div className="booking-history">
      <NotificationContainer />
      <Container>
        <h1>Booking History</h1>
        <Row>
          <Form.Control
            as="select"
            className="filter-status"
            onChange={(e) => {
              const value = e.target.value === "" ? null : e.target.value;
              setParams({ ...params, status: value });
            }}
          >
            <option value="">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="canceled">Canceled</option>
            <option value="incompleted">Incompleted</option>
          </Form.Control>
        </Row>
        {bookings ? (
          bookings.map((booking, index) => {
            const checkIn = new Date(booking.dateCheckIn);
            const checkOut = new Date(booking.dateCheckOut);
            return (
              <BookingCard
                key={index}
                title={booking.houseName}
                status={booking.status}
                id={booking.id}
                night={booking.night}
                checkIn={checkIn.toLocaleDateString()}
                checkOut={checkOut.toLocaleDateString()}
                price={booking.bill}
                rating={booking.rating}
                bookDate={booking.createdAt}
                houseId={booking.houseId}
              />
            );
          })
        ) : (
          <></>
        )}
      </Container>
    </div>
  );
};

export default BookingManage;

import React, { useState, useEffect } from "react";
import BookingService from "../../services/BookingService";
import { Table } from "react-bootstrap";

function Canceled( props) {
  const [bookingsCancel, setBookingsCancel] = useState();
  const [loading, setLoading] = useState(false);
  const {accountId } = props;
  const paramsString = {
    accountId: accountId,
    size: 20,
    page: 0,
    status: "canceled",
  };
  useEffect(() => {
    setLoading(true);
    new BookingService()
      .getBookingForCustomer(paramsString)
      .then((bookings) => {
        if (bookings) {
          setBookingsCancel(bookings.listObject);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
  }, []);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>STT</th>
          <th>House</th>
          <th>CheckIn</th>
          <th>CheckOut</th>
        </tr>
      </thead>
      {bookingsCancel &&
        bookingsCancel.map((booking, index) => {
          const checkIn = new Date(booking.dateCheckIn);
          const checkEnd = new Date(booking.dateCheckOut);
          return (
            <tbody key={index}>
              <tr>
                <th>{index}</th>
                <th>{booking.houseName}</th>
                <th>{checkIn.toLocaleDateString()}</th>
                <th>{checkEnd.toLocaleDateString()}</th>
              </tr>
            </tbody>
          );
        })}
    </Table>
  );
}

export default Canceled;

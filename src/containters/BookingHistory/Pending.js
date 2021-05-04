import React, { useState, useEffect } from "react";
import BookingService from "../../services/BookingService";
import { Table, Button } from "react-bootstrap";
import { NotificationManager } from "react-notifications";

function Pending(props) {
  const { accountId } = props;
  const [loading, setLoading] = useState(false);
  const [bookingsPending, setBookingsPending] = useState();
  const paramsString = {
    accountId: accountId,
    size: 20,
    page: 0,
    status: "pending",
  };
  useEffect(() => {
    setLoading(true);
    new BookingService()
      .getBookingForCustomer(paramsString)
      .then((bookings) => {
        if (bookings) {
          setBookingsPending(bookings.listObject);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
  }, []);

  const HandleCancelBooking = (id) => {
    setLoading(true);
    const filteredBooking = bookingsPending.filter((item) => item.id !== id);
    new BookingService().cancelBooking(id).then(
      () => {
        NotificationManager.success("Cancel Booking Success");
        setBookingsPending(filteredBooking);
        setLoading(false);
      },
      (error) => {
        NotificationManager.error("Have Something Wrong");
        setLoading(false);
      }
    );
  };
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>STT</th>
          <th>House</th>
          <th>CheckIn</th>
          <th>CheckOut</th>
          <th>Action</th>
        </tr>
      </thead>
      {bookingsPending &&
        bookingsPending.map((booking, index) => {
          const checkIn = new Date(booking.dateCheckIn);
          const checkEnd = new Date(booking.dateCheckOut);
          return (
            <tbody key={index}>
              <tr>
                <th>{index}</th>
                <th>{booking.houseName}</th>
                <th>{checkIn.toLocaleDateString()}</th>
                <th>{checkEnd.toLocaleDateString()}</th>
                <th>
                  <Button
                    variant="danger"
                    onClick={() => {
                      HandleCancelBooking(booking.id);
                    }}
                  >
                    Cancel Booking
                  </Button>
                </th>
              </tr>
            </tbody>
          );
        })}
    </Table>
  );
}

export default Pending;

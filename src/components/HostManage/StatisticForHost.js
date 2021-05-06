import React, { useState, useEffect } from "react";
import { Card, CardDeck, Container } from "react-bootstrap";
import Money from "../../assets/estimate-money.svg";
import Booking from "../../assets/booking.svg";
import Average from "../../assets/gold.svg";
import Rating from "../../assets/rating.svg";
import Statistic from "../PlaceHolder/Statistic";
import CardBooking from "../PlaceHolder/CardBooking";
import UserService from "../../services/UserService";
import { NotificationManager } from "react-notifications";
import { DEFAULT_ERROR_MESSAGE } from "../../constants/message";
import Icon from "../Icon/Icon";
import BookingCard from '../BookingCard/BookingCard';

function StatisticForHost(props) {
  const { accountId } = props;
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState([]);
  const [listbookings, setListbookings] = useState([]);
  useEffect(() => {
    setLoading(true);
    new UserService().getStatisticOwner(accountId).then((response) => {
      if (response) {
        setStatistics(response.data);
        setListbookings(response.data.listBooking);
        NotificationManager.success(response.message);
        setLoading(false);
      } else {
        setLoading(false);
        NotificationManager.error(DEFAULT_ERROR_MESSAGE);
      }
    });
  }, [accountId]);
  return (
    <Container>
      <h3>Hosting progress</h3>

      {loading ? (
        <Statistic></Statistic>
      ) : (
        <CardDeck>
          <Card>
            <Card.Body>
              <Card.Title>Total income</Card.Title>
              <Icon
                src={Money}
                classIcon="Icon-statictis"
                classText="text-card"
                text={statistics.revenue}
                unit="VNĐ"
              ></Icon>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Total booking</Card.Title>
              <Card.Text>
                <Icon
                  src={Booking}
                  classIcon="Icon-statictis"
                  classText="text-card"
                  text={statistics.totalBooking}
                  unit="Bookings"
                ></Icon>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Average rating</Card.Title>
              <Card.Text>
                <Icon
                  src={Average}
                  classIcon="Icon-statictis"
                  classText="text-card"
                  text={statistics.averageRating}
                  unit="Star"
                ></Icon>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Total Rating</Card.Title>
              <Card.Text>
                <Icon
                  src={Rating}
                  classIcon="Icon-statictis"
                  classText="text-card"
                  text={statistics.totalRating}
                  unit="Ratings"
                ></Icon>
              </Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>
      )}
      <h3>Recent reservations</h3>
      <CardBooking></CardBooking>
      <BookingCard></BookingCard>
      {listbookings.map((booking) => {
        const checkIn = new Date(booking.dateCheckIn);
        const checkOut = new Date(booking.dateCheckOut);
        return (
          <Card>
            <Card.Header>{booking.status}</Card.Header>
            <Card.Body>
              <Card.Title>{booking.houseName}</Card.Title>
              <Card.Text>Customer Name: {booking.customerName}</Card.Text>
              <Card.Text>Total: {booking.bill} đ</Card.Text>
            </Card.Body>
            <Card.Footer>
              CheckIn Day : {checkIn.toLocaleDateString()} - CheckOut Day :{" "}
              {checkOut.toLocaleDateString()}
            </Card.Footer>
          </Card>
        );
      })}
    </Container>
  );
}

export default StatisticForHost;

import React, { useState, useEffect } from "react";
import { Card, CardDeck, Container } from "react-bootstrap";
import Money from "../../assets/estimate-money.svg";
import Booking from "../../assets/booking.svg";
import Average from "../../assets/gold.svg";
import Rating from "../../assets/rating.svg";
import Statistic from "../PlaceHolder/Statistic";
import UserService from "../../services/UserService";
import {
    NotificationManager,
  } from "react-notifications";
  import { DEFAULT_ERROR_MESSAGE } from "../../constants/message";
  import Icon from "../Icon/Icon";


function StatisticForHost(props) {
    const {accountId} = props
    const [loading, setLoading] = useState(false);
    const [statistics, setStatistics] = useState([]);
    useEffect(() => {
        setLoading(true);
        new UserService().getStatisticOwner(accountId).then((response) => {
          if (response) {
            setStatistics(response.data);
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
      <Card>
        <Card.Header>Featured</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>No booking(s) found</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default StatisticForHost;

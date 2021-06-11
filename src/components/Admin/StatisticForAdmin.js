import React, { useState, useEffect } from "react";
import { Card, CardDeck } from "react-bootstrap";
import Money from "../../assets/estimate-money.svg";
import Host from "../../assets/host.svg";
import House from "../../assets/house.svg";
import Paid from "../../assets/paid.svg";
import Booking from "../../assets/booking.svg";
import Icon from "../Icon/Icon";
import "./Admin.css";
import AdminService from "../../services/AdminService";
import Statistic from "../PlaceHolder/Statistic";
import Chart from "./Chart";
import { numberWithCommas } from "../../helper/helper";

function StatisticForAdmin() {
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [revenue,setRevenue] = useState(0);

  useEffect(() => {
    setLoading(true);
    new AdminService().getStatistic().then((response) => {
      if (response) {
        setStatistics(response.data);
        setRevenue(response.data.totalRevenue);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, []);

  return (
    <div>
      {loading ? (
        <Statistic></Statistic>
      ) : (
        <CardDeck>
          <Card>
            <Card.Body>
              <Card.Title>Total income</Card.Title>
              <Card.Text>
                <Icon
                  src={Money}
                  classIcon="Icon-statictis"
                  classText="text-card"
                  text={numberWithCommas(revenue)}
                  unit="VNĐ"
                ></Icon>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Total Host Account</Card.Title>
              <Card.Text>
                <Icon
                  src={Host}
                  classIcon="Icon-statictis"
                  classText="text-card"
                  text={statistics.totalAccountHost}
                  unit="Hosts"
                ></Icon>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Total House</Card.Title>
              <Card.Text>
                <Icon
                  src={House}
                  classIcon="Icon-statictis"
                  classText="text-card"
                  text={statistics.totalHouse}
                  unit="Houses"
                ></Icon>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Total Paid Bookings</Card.Title>
              <Card.Text>
                <Icon
                  src={Paid}
                  classIcon="Icon-statictis"
                  classText="text-card"
                  text={statistics.totalBookingPaid}
                  unit="Bookings"
                ></Icon>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Total Completed Bookings</Card.Title>
              <Card.Text>
                <Icon
                  src={Booking}
                  classIcon="Icon-statictis"
                  classText="text-card"
                  text={statistics.totalBookingCompleted}
                  unit="Bookings"
                ></Icon>
              </Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>
      )}
      <Chart></Chart>
    </div>
  );
}

export default StatisticForAdmin;

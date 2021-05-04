import "./BookingHistory.css";
import Canceled from "./Canceled";
import Pending from "./Pending";
import Completed from "./Completed";
import React from "react";
import { Redirect } from "react-router";
import { NotificationContainer } from "react-notifications";
import { Container, Tab, Tabs } from "react-bootstrap";

const BookingManage = () => {
  const accountId = localStorage.getItem("userId");
  const isLogin = localStorage.getItem("token");
  if (isLogin == null) {
    return <Redirect to="/login"></Redirect>;
  }
  return (
    <div className="booking-history">
      <Container>
        <h1>Booking History</h1>
        <Tabs defaultActiveKey="completed" id="uncontrolled-tab-example">
          <Tab eventKey="completed" title="Completed">
            <Completed accountId={accountId}></Completed>
          </Tab>
          <Tab eventKey="pending" title="Pending">
            <Pending accountId={accountId}></Pending>
          </Tab>
          <Tab eventKey="canceled" title="Canceled">
            <Canceled accountId={accountId}></Canceled>
          </Tab>
        </Tabs>
        <NotificationContainer></NotificationContainer>
      </Container>
    </div>
  );
};

export default BookingManage;

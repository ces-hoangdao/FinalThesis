import React from "react";
import { Tab, Col, Nav, Row } from "react-bootstrap";
import UserManager from "./UserManager";
import HouseManager from "./HouseManagerForAdmin";
import Header from "./AdminHeader";
import "./Admin.css";
import Footer from "../Footer/Footer";
import Statistic from "./StatisticForAdmin";
import {
  NotificationContainer,
} from "react-notifications";

function Admin() {
  return (
    <Row>
      <Tab.Container  defaultActiveKey="statistic">
        <Col xs={2} className="sidebar">
          <Nav className="flex-column" variant="pills" >
            <h1 className="TM">Travel Master</h1>
            <Nav.Item>
              <Nav.Link eventKey="statistic">Statistic For Admin</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="userManager">User Management</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="houseManager">House Manager</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>

        <Col xs={10} className="content">
          <Tab.Content>
            <Header></Header>
            <Tab.Pane eventKey="statistic" className="content-tab">
              <Statistic></Statistic>
            </Tab.Pane>
            <Tab.Pane eventKey="userManager" className="content-tab">
              <UserManager></UserManager>
            </Tab.Pane>
            <Tab.Pane eventKey="houseManager" className="content-tab">
              <HouseManager></HouseManager>
            </Tab.Pane>
            <Footer className="footer-admin"></Footer>
          </Tab.Content>
        </Col>
      </Tab.Container>
      <NotificationContainer></NotificationContainer>
    </Row>
  );
}

export default Admin;

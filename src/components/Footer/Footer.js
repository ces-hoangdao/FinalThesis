import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="Dis">
      <Container className="Footer">
        <Row>
          <Col sm={3}>
            <Row>Travel Master</Row>
            <Row>
              We kaboom your beauty<br></br> holiday instantly and memorable.
            </Row>
          </Col>

          <Col sm={3}>
            <Row>For Beginners</Row>
            <Row>
              <Link to="/register">New Account</Link>
            </Row>
            <Row>
              <Link to="/listhouse">Start Booking</Link>
            </Row>
          </Col>

          <Col sm={3}>
            <Row>Explore Us</Row>
            <Row>
              <Link to="/about">Our Careers</Link>
            </Row>
            <Row>
              <Link to="/">Privacy</Link>
            </Row>
          </Col>
          <Col sm={3}>
            <Row>Connect Us</Row>
            <Row>Travelmaster@gmail.com</Row>
            <Row>Phone: +84 33246 4422</Row>
            <Row>32 Nguyen Ba Hoc - Da Nang</Row>
          </Col>
        </Row>
      </Container>
      <div className="text-center py-5">Copyright &copy; Travel Master</div>
    </footer>
  );
};

export default Footer;

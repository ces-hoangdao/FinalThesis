import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./About.css";
class About extends Component {
  render() {
    return (
      <div className="cover-about">
        <div className="about">
          <Container>
            <div className="title-about">
              <h4>Travel Master is a free platform</h4>
            </div>

            <Row>
              <Col>
                <p className="content-about">
                  Developed by a group interns in CES's final internship program, Travel Master focuses on
                  using technology to reduce barriers and connect between
                  travelers and homestay owners.
                </p>
                <Row className="count-box">
                  <Col>
                    <h4>300 +</h4>
                    <div>Host</div>
                  </Col>
                  <Col>
                    <h4>1,000 +</h4>
                    <div>Homestay</div>
                  </Col>
                  <Col>
                    <h4>2000 + </h4>
                    <div>Booking</div>
                  </Col>
                </Row>
              </Col>
              <Col> </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
export default About;

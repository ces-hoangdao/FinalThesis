import React, { Component } from "react";
import { Row, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import House from "../components/House/House";
import Banner from "../components/Banner/Banner";

class Home extends Component {
  render() {
    return (
      <div>
        <Banner></Banner>
        <Container>
          <h1>Feature Properties</h1>
          <Row>
            <div className="col-md-6">
              <House></House>
            </div>
            <div className="col-md-6">
              <House></House>
            </div>
            <div className="col-md-6">
              <House></House>
            </div>
            <div className="col-md-6">
              <House></House>
            </div>
          </Row>
          <Button variant="outline-secondary">
            <Link to="/homelist" >View More</Link>
          </Button>
        </Container>
      </div>
    );
  }
}
export default Home;

import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import { Row, Container, Button, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Banner from "../components/Banner/Banner";
import HouseService from "../services/HouseService";
import "./Home.css";

const Home = () => {
  const [houses, setHouses] = useState(null);
  const [loading, setLoading] = useState(false);
  const randomPage = Math.floor(Math.random() * 10);
  const totalHouse = 6;
  const [filter, setFilter] = useState({
    size: totalHouse,
    page: randomPage,
  });

  useEffect(() => {
    setLoading(true);
    new HouseService().getHouses(filter).then(houses =>{
      setHouses(houses);
      setLoading(false);
    })
    
 
  }, [filter]);

  return (
    <div>
      <Banner></Banner>
      <Container>
        <h1 className="text-header">Feature Properties</h1>
        {loading ? (
          <Loader></Loader>
        ) : (
          <Row>
            {houses &&
              houses.map((house, index) => {
                return (
                  <div className="col-md-6" key={index}>
                    <Card className="card-homepage">
                      <Link to={"/housedetail/" + String(house.id)}>
                        <Card.Img
                          className="card-homepage-img"
                          src={house.image}
                          alt="house"
                        />
                      </Link>
                      <Card.Body className="">
                        <Card.Title> {house.title}</Card.Title>
                        <Card.Text className="">
                          <Row>
                            <Col>
                              <span className="text-content">
                                {" "}
                                Price: {house.price} đ/ day
                              </span>
                            </Col>
                            <Col>
                              <span className="text-content">
                                Property size: {house.size} m &sup2;
                              </span>
                            </Col>
                          </Row>
                          <span className="text-content">
                            City: {house.city}
                          </span>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
          </Row>
        )}
        <Row className="justify-content-md-center">
          <Button variant="primary" className="btn-homepage" size="lg">
            <Link to="/listhouse">View More</Link>
          </Button>
        </Row>
        <div className="feedback">
          <h1 className="text-header">What our clients are saying</h1>
        </div>
      </Container>
    </div>
  );
};
export default Home;

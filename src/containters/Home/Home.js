import React, { useState, useEffect } from "react";
import { Row, Container, Button, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import HomePagePlaceHolder from "../../components/PlaceHolder/HomePagePlaceHolder/HomePagePlaceHolder";
import Banner from "../../components/Banner/Banner";
import { numberWithCommas } from "../../helper/helper";
import HouseService from "../../services/HouseService";

import "./Home.css";


const Home = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const randomPage = Math.floor(Math.random() * 10);
  const totalHouse = 6;
  const filter = {
    size: totalHouse,
    page: randomPage,
  };

  useEffect(() => {
    setLoading(true);
    new HouseService()
      .getHouses(filter)
      .then((response) => {
        if (response.status < 300) {
          setHouses(response.data.listObject)
          setLoading(false);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Banner />
      <Container >
        <h1 className="text-header">Feature Properties</h1>
        {loading ? (
          <HomePagePlaceHolder />
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
                                Price: {numberWithCommas(house.price)} đ/ night
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
          <Link to="/listhouse">
            <Button variant="primary" className="btn-homepage" size="lg">
              View More
            </Button>
          </Link>
        </Row>
      </Container>
    </div>
  );
};

export default Home;

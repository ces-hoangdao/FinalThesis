import React, { useState, useEffect } from "react";
import { Row, Container, Button, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import HomePagePlaceHolder from "../../components/PlaceHolder/HomePagePlaceHolder/HomePagePlaceHolder";
import Banner from "../../components/Banner/Banner";
import { numberWithCommas } from "../../helper/helper";
import HouseService from "../../services/HouseService";
import fb from "../../assets/fb.jpeg";

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
    new HouseService().getHouses(filter).then((response) => {
      if (response.status < 300) {
        setHouses(response.data.listObject);
        setLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Banner />
      <Container>
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
      <div className="say">
        <h1>What clients say about us</h1>
        <Container>
          <p className="content-feedback">
            Nice room, walking distance to My Khe beach, very suitable for
            families with young children. The first time I booked a room through
            Master Travel, I didn't think the room was so satisfying. Spacious
            room with kitchen for cooking, refrigerator, washing machine, and
            separate drying area. Thank you can for giving my family a perfect
            vacation in DN. 3 days here are comfortable with a family with a
            2-year-old baby accompanying them. In addition to meals outside, I
            went to the supermarket to buy food to cook for my baby. The hotel
            is convenient around supermarkets and restaurants everywhere. If I
            have the opportunity to come back, I will still book an apartment
            like this!
          </p>
          <h2 className="text-center"> feedback by Thorneemily</h2>{" "}
          <img src={fb} className="fb-img" alt=""fb></img>
        </Container>
      </div>
    </div>
  );
};

export default Home;

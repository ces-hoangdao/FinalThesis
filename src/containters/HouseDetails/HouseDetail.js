import React, { useState, useEffect } from "react";
import { Col, Row, Container, Button, Carousel } from "react-bootstrap";

import Location from "../../assets/location.svg";
import Wifi from "../../assets/wifi-line.svg";
import Price from "../../assets/price.svg";
import Square from "../../assets/ic-squarmeter@2x.svg";
import AirCondition from "../../assets/air-condition.svg";
import Bed from "../../assets/bed.svg";
import fridge from "../../assets/fridge.svg";
import Guest from "../../assets/guest.svg";
import TV from "../../assets/TV.svg";
import Pool from "../../assets/swimming.svg";
import Phone from "../../assets/phone.svg";
import Loader from "../../components/Loader";
import Icon from "../../components/Icon/Icon";
import RelatedHouse from "../RelatedHouse/RelatedHouse";
import Booking from "../Booking/Booking";
import Rating from "../../components/Ratings/Ratings";
import { numberWithCommas } from "../../helper/helper";
import HouseService from "../../services/HouseService";

import { NotificationContainer, NotificationManager } from "react-notifications";
import { DEFAULT_ERROR_MESSAGE } from "../../constants/message";

import "./HouseDetail.css";

const HouseDetail = () => {
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const houseId = {
    houseId: window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1
    )
  };

  const handleClick = () => {
    setModalShow(true);
  }

  useEffect(() => {
    setLoading(true);
    new HouseService()
      .getHouseDetail(houseId)
      .then((response) => {
        if (response.status < 300) {
          NotificationManager.success(response.message);
          setHouse(response.data);
          setRatings(response.data.listRating);
          setLoading(false);
        } else {
          NotificationManager.error(response.message);
        }
      })
      .catch((error) => {
        NotificationManager.error(DEFAULT_ERROR_MESSAGE);
      });
  }, []);

  return (
    <div className="house-detail">
      <div>{loading ? <Loader></Loader> : <></>}</div>
      <NotificationContainer></NotificationContainer>
      {house && (
        <>
          <Booking
            price={house.price}
            houseName={house.title.split('-')[0]}
            houseId={houseId.houseId}
            show={modalShow}
            onHide={() => setModalShow(false)}
            disabled={house.dateBooked}
          />
          <Container>
            <h1 className="text-center">House Details</h1>
            <div className="img-wrap">
              <Carousel>
                <Carousel.Item>
                  <img
                    className="img-slide"
                    src={house.image}
                    alt="First slide"
                  />
                </Carousel.Item>
                {house.images.map((image, index) => {
                  return (
                    <Carousel.Item key={index}>
                      <img
                        className="img-slide"
                        src={image}
                        alt="First slide"
                      />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </div>

            <div className="house-info">
              <h1 className="house-title">{house.title}</h1>
              <h2 className="house-address">{house.address}</h2>

              <Row>
                <Col>
                  <Icon
                    src={Price}
                    text={numberWithCommas(house.price)}
                    unit="/1day"
                    classTexe="text-houseDetail"
                    classIcon="icon-houseDetail"
                  ></Icon>
                </Col>
                <Col>
                  <Icon
                    src={Location}
                    text={house.city}
                    classTexe="text-houseDetail"
                    classIcon="icon-houseDetail"
                  ></Icon>
                </Col>
                <Col>
                  <Icon
                    src={Square}
                    text={house.size}
                    unit=" m &sup2;"
                    classTexe="text-houseDetail"
                    classIcon="icon-houseDetail"
                  ></Icon>
                </Col>
                <Col>
                  <Icon
                    src={Phone}
                    text={"+" + house.phoneContact}
                    classTexe="text-houseDetail"
                    classIcon="icon-houseDetail"
                  ></Icon>
                </Col>
              </Row>
              <Row>
                <Col sm={3}>
                  <Icon
                    src={Guest}
                    text={house.maxGuest}
                    unit="people"
                    classTexe="text-houseDetail"
                    classIcon="icon-houseDetail"
                  ></Icon>
                </Col>
                <Col sm={3}>
                  <Icon
                    src={Bed}
                    text={house.bedroom}
                    unit="bedroom"
                    classTexe="text-houseDetail"
                    classIcon="icon-houseDetail"
                  ></Icon>
                </Col>
                {house.swimPool && (
                  <Col sm={6}>
                    <Icon
                      src={Pool}
                      unit="Swimming Pool"
                      classTexe="text-houseDetail"
                      classIcon="icon-houseDetail"
                    ></Icon>
                  </Col>
                )}
              </Row>
              <Row>
                {house.wifi && (
                  <Col sm={3}>
                    <Icon
                      src={Wifi}
                      unit="Wifi"
                      classTexe="text-houseDetail"
                      classIcon="icon-houseDetail"
                    ></Icon>
                  </Col>
                )}
                {house.airConditionerr && (
                  <Col sm={3}>
                    <Icon
                      src={AirCondition}
                      unit="Air Conditioner"
                      classTexe="text-houseDetail"
                      classIcon="icon-houseDetail"
                    ></Icon>
                  </Col>
                )}
                {house.tivi && (
                  <Col sm={3}>
                    <Icon
                      src={TV}
                      unit="Tivi"
                      classTexe="text-houseDetail"
                      classIcon="icon-houseDetail"
                    ></Icon>
                  </Col>
                )}
                {house.fridge && (
                  <Col sm={3}>
                    <Icon
                      src={fridge}
                      unit="Fridge"
                      classTexe="text-houseDetail"
                      classIcon="icon-houseDetail"
                    ></Icon>
                  </Col>
                )}
              </Row>
              <Row className="justify-content-md-center">
                <Button
                  className="btn-bookhouse"
                  block
                  size="lg"
                  variant="outline-dark"
                  onClick={handleClick}
                >
                  Book house
              </Button>
              </Row>
            </div>

            <div className="text-content">
              <h1 className="text-center">Details</h1>
              <div dangerouslySetInnerHTML={{ __html: house.content }} />
            </div>
          </Container>
        </>
      )}
      {ratings.length ? <Rating ratings={ratings}></Rating> : <div></div>}
      <div className="container">
        <h1 className="text-center">Related Projects</h1>
        <RelatedHouse houseId = {houseId}></RelatedHouse>
      </div>
    </div>
  );
};

export default HouseDetail;

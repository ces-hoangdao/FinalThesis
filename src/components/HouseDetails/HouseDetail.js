import React, { useState, useEffect } from "react";
import { Col, Row, Container, Button, Carousel } from "react-bootstrap";
import HouseService from "../../services/HouseService";
import "./HouseDetail.css";
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
import Loader from "../Loader";
import { useHistory } from "react-router-dom";
import Icon from "../Icon/Icon";
import Rating from "../Ratings/Ratings";
import RelatedHouse from "../../containters/RelatedHouse/RelatedHouse";

const HouseDetail = () => {
  const [houseDetail, setHouseDetail] = useState({});
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [houseId,setHouseId] = useState({
    houseId: window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1
    ),
  });

  const [images, setImages] = useState([]);

  useEffect(() => {
    setLoading(true);

    new HouseService().getHouseDetail(houseId).then((house) => {
      if (house) {
        setHouseDetail(house);
        setRatings(house.listRating);
        setImages(house.images);
        setLoading(false);
      } else {
        history.push("/notfoundpage");
      }
    });
  }, [houseId]);

  return (
    <div className="house-detail">
      <div>{loading && <Loader></Loader>}</div>
      {houseDetail && (
        <Container>
          <h1 className="text-title">House Details</h1>
          <div className="img-wrap">
            <Carousel>
              <Carousel.Item>
                <img
                  className="img-slide"
                  src={houseDetail.image}
                  alt="First slide"
                />
              </Carousel.Item>
              {images.map((image) => {
                return (
                  <Carousel.Item>
                    <img
                      className="img-slide"
                      src={image.image}
                      alt="First slide"
                    />
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </div>

          <div className="house-info">
            <h1 className="house-title">{houseDetail.title}</h1>
            <h2 className="house-address">{houseDetail.address}</h2>

            <Row>
              <Col>
                <Icon
                  src={Price}
                  text={houseDetail.price}
                  unit="/1day"
                  classTexe="text-houseDetail"
                  classIcon="icon-houseDetail"
                ></Icon>
              </Col>
              <Col>
                <Icon
                  src={Location}
                  text={houseDetail.city}
                  classTexe="text-houseDetail"
                  classIcon="icon-houseDetail"
                ></Icon>
              </Col>
              <Col>
                <Icon
                  src={Square}
                  text={houseDetail.size}
                  unit=" m &sup2;"
                  classTexe="text-houseDetail"
                  classIcon="icon-houseDetail"
                ></Icon>
              </Col>
              <Col>
                <Icon
                  src={Phone}
                  text={"+" + houseDetail.phoneContact}
                  classTexe="text-houseDetail"
                  classIcon="icon-houseDetail"
                ></Icon>
              </Col>
            </Row>
            <Row>
              <Col sm={3}>
                <Icon
                  src={Guest}
                  text={houseDetail.maxGuest}
                  unit="people"
                  classTexe="text-houseDetail"
                  classIcon="icon-houseDetail"
                ></Icon>
              </Col>
              <Col sm={3}>
                <Icon
                  src={Bed}
                  text={houseDetail.bedroom}
                  unit="bedroom"
                  classTexe="text-houseDetail"
                  classIcon="icon-houseDetail"
                ></Icon>
              </Col>
              {houseDetail.swimPool && (
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
              {houseDetail.wifi && (
                <Col sm={3}>
                  <Icon
                    src={Wifi}
                    unit="Wifi"
                    classTexe="text-houseDetail"
                    classIcon="icon-houseDetail"
                  ></Icon>
                </Col>
              )}
              {houseDetail.airConditionerr && (
                <Col sm={3}>
                  <Icon
                    src={AirCondition}
                    unit="Air Conditioner"
                    classTexe="text-houseDetail"
                    classIcon="icon-houseDetail"
                  ></Icon>
                </Col>
              )}
              {houseDetail.tivi && (
                <Col sm={3}>
                  <Icon
                    src={TV}
                    unit="Tivi"
                    classTexe="text-houseDetail"
                    classIcon="icon-houseDetail"
                  ></Icon>
                </Col>
              )}
              {houseDetail.fridge && (
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
              >
                Book house
              </Button>
            </Row>
          </div>

          <div className="text-content">
            <h1 className="text-center">Details</h1>
            <div dangerouslySetInnerHTML={{ __html: houseDetail.content }} />
          </div>
        </Container>
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

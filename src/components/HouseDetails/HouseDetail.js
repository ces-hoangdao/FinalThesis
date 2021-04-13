import React, { useState, useEffect } from "react";
import { Col, Row, Container, Button, Carousel } from "react-bootstrap";
import HouseService from "../../helper/HouseService";
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
import queryString from "query-string";
import Loader from "../Loader";
import { useHistory } from "react-router-dom";
import Icon from "../Icon/Icon";

const HouseDetail = () => {
  const [houseDetail, setHouseDetail] = useState(null);
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [idHouse, setIdHouse] = useState({
    houseId: window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1
    ),
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    setLoading(true);
    new HouseService().getDetailHouse(idHouse).then((house) => {
      if (house) {
        setHouseDetail(house);
        setImages(house.images);
        setLoading(false);
      }
      else{
        history.push("/notfoundpage");
      }
    });
    
  }, [idHouse]);

  return (
    <div className="house-detail">
    
      <div>{loading && <Loader></Loader>}</div>
      {houseDetail && (
        <Container>
          <h1 className = "text-title">House Details</h1>
          <div className="img-wrap">
            <Carousel>
              <Carousel.Item>
                <img
                  className="img-slide"y
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
                <img className="icon-houseDetail" src={Price} alt=" price"></img>
                <span className="text-houseDetail"> {houseDetail.price} đ/day</span>
              </Col>
              <Col>
                <img className="icon-houseDetail" src={Location} alt="location"></img>
                <span className="text-houseDetail"> {houseDetail.province}</span>
              </Col>
              <Col>
                <img className="icon-houseDetail" src={Square} alt=" Squaremeter"></img>
                <span className="text-houseDetail"> {houseDetail.size} m &sup2;</span>
              </Col>
              <Col className="">
                <img className="icon-houseDetail" src={Phone} alt="phone"></img>
                <span className="text-houseDetail">+ {houseDetail.phoneContact}</span>
              </Col>
            </Row>

            <Row>
              <Col sm={3}>
                <img className="icon-houseDetail" src={Guest} alt=" Guest max"></img>
                <span className="text-houseDetail"> {houseDetail.maxGuest} people</span>
              </Col>
              <Col sm={3}>
                <img className="icon-houseDetail" src={Bed} alt=" Bedroom"></img>
                <span className="text-houseDetail"> {houseDetail.bedroom} bedroom</span>
              </Col>
              {houseDetail.swimPool && (
                <Col sm={6}>
                  <img className="icon-houseDetail" src={Pool} alt="swimming"></img>
                  <span className="text-houseDetail">Swimming Pool</span>
                </Col>
              )}
            </Row>

            <Row>
              {houseDetail.wifi && (
                <Col sm={3}>
                  <img className="icon-houseDetail" src={Wifi} alt="wifi"></img>
                  <span className="text-houseDetail">Wifi</span>
                </Col>
              )}
                <Col sm={3}>
                <img className="icon" src={Square} alt=" Squaremeter"></img>
                <span className="text"> {houseDetail.size} m &sup2;</span>
                </Col>
            </Row>
            
            <Row>
              <img className="icon" src={Wifi} alt="wifi"></img>
              <span className="text">
                {" "}
                {/* {houseDetail.amenities.idAmenities === 1} */}
              </span>
              <img
                className="icon"
                src={AirCondition}
                alt="aircondition"
              ></img>
              <span className="text"> 3</span>
              <span className="phone">
                Phone: + {houseDetail.phoneContact}
              </span>
              <Button className="btn-bookhouse" block size="lg">
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
      <div className="container">
        <h1 className="text-center">Related Projects</h1>
        
      </div>
    </div>
  );
};

export default HouseDetail;

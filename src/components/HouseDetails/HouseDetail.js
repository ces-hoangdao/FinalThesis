import React, { useState, useEffect } from "react";
import { Col, Row, Container, Carousel } from "react-bootstrap";
import axios from "axios";
import "./HouseDetail.css";
import Location from "../../assets/location.svg";
import Wifi from "../../assets/wifi-line.svg";
import Price from "../../assets/price.svg";
import Square from "../../assets/ic-squarmeter@2x.svg";
import AirCondition from "../../assets/aircondition.svg";
import queryString from "query-string";
import Loader from "../Loader";
import {API_URL} from "../../constants/route";

const HouseDetail = () => {
  const [houseDetail, setHouseDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [idHouse, setidHouse] = useState({
    idHouse: window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)
  });
  const [images, setImages] = useState([]);
  useEffect(() => {
    async function fetchHouse() {
      try {
        setLoading(true);
        const paramsString = queryString.stringify(idHouse);
        const requestUrl = API_URL + `/houses/detail?${paramsString}`;
        const response = await axios.get(requestUrl);
        setHouseDetail(response.data);
        setImages(response.data.images);
        setLoading(false);
      } catch (err) {
        //error
      }
    }

    fetchHouse();
  }, [idHouse]);

  return (
    <div className="house-detail">
      <div>{loading && <Loader></Loader>}</div>
      {houseDetail && (
        <Container>
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
            <Col>
              <Row>
                <img className="icon" src={Price} alt=" price"></img>
                <span className="text"> {houseDetail.price} đ</span>

                <img className="icon" src={Location} alt="location"></img>
                <span className="text"> {houseDetail.province}</span>

                <img className="icon" src={Square} alt=" Squaremeter"></img>
                <span className="text"> {houseDetail.size} m</span>

                <span className="phone">
                  Phone: + {houseDetail.phoneContact}
                </span>
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
              </Row>
            </Col>
          </div>

          <div>
            <h1 className="text-center">Details</h1>
            <div dangerouslySetInnerHTML={{ __html: houseDetail.content }} />
          </div>
        </Container>
      )}
      <div>
        <h1 className="text-center">Related Projects</h1>
      </div>
    </div>
  );
};

export default HouseDetail;

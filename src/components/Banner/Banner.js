import React from "react";
import { Carousel } from "react-bootstrap";
import "./Banner.css";
import Slide1 from "../../assets/banner.jpg";
import Slide2 from "../../assets/cover1.jpg";
import Slide3 from "../../assets/caurong.jpg";

const Banner = () => {
  return (
    // <div className="hero-image">
    //   <div className="hero-text"></div>
    // </div>
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 img-slide"
          src={Slide2}
          alt="First slide"
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 img-slide"
          src={Slide1}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 img-slide"
          src={Slide3}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Banner;

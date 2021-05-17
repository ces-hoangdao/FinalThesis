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
          className="d-block w-100 img-carousel"
          src={Slide2}
          alt="First slide"
        />
      
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 img-carousel"
          src={Slide1}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 img-carousel"
          src={Slide3}
          alt="Third slide"
        />

       
      </Carousel.Item>
    </Carousel>
  );
};

export default Banner;

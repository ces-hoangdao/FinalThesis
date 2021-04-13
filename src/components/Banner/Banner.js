import React from "react";
import {Form, Button, FormControl} from "react-bootstrap";
import "./Banner.css";
const Banner = () => {
  return (
    <div class="hero-image">
      <div class="hero-text">
        <Form inline>
          <FormControl type="text" placeholder="Search" className=" mr-lg-2" />
          <Button type="submit">Search</Button>
        </Form>
      </div>
    </div>
  );
};

export default Banner;

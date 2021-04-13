import React, { useMemo, useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import * as Locations from "laika-locations";
import userService from "../helper/userService";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Redirect } from "react-router-dom";
import MultipleImageUploadComponent from "../layout/ImageUpload/MultipleImageUplad/MultipleImageUploadComponent"

const PostHouse = () => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [maxguest, setMaxGuest] = useState("");
  const [phone, setPhone] = useState("");
  const [ac, setAC] = useState(false);
  const [wifi, setWifi] = useState(false);
  const [tv, setTV] = useState(false);
  const [pool, setPool] = useState(false);
  const [fridge, setFridge] = useState(false);
  const [bedroom, setBedRoom] = useState("");
  const isLogin = localStorage.getItem("token");

  //get country and city
  const { countries } = Locations.getCountries();

  const cities = useMemo(
    () =>
      country ? Locations.getCitiesByCountry(country) : [],
    [country]
  );

  const onSelectCountry = ({ currentTarget }) => {
    console.log(currentTarget.value);
    setCountry(currentTarget.value);
  };

  const onSelectCity = ({ currentTarget }) => {
    console.log(currentTarget.value);
    setCity(currentTarget.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();

    new userService()
      .posthouse(
        address,
        ac,
        bedroom,
        description,
        Locations.getCountryById(country).name,
        fridge,
        maxguest,
        phone,
        price,
        Locations.getCityNameById(city),
        area,
        pool,
        title,
        wifi,
        tv
      )
      .then(
        () => {
          NotificationManager.success("Post House success");
          window.location.replace("/");
        },
        (error) => {
          NotificationManager.error("Have Something wrong");
          console.log(error);
        }
      );
  };

  if (isLogin == null) {
    return <Redirect to="/login"></Redirect>;
  }
  
  return (
    <Container>
      <h1>Add New House</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group as={Row} controlId="HouseTitle">
          <Form.Label column sm="2">
            Title
          </Form.Label>
          <Col sm="4">
            <Form.Control
              required
              onChange={(e) => setTitle(e.target.value)}
            ></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col>
            <Form.File>
              <Form.File.Label>Image Cover</Form.File.Label>
              <Form.File.Input />
            </Form.File>
          </Col>
          <Col>
            <Form.File>
              <Form.File.Label>Images </Form.File.Label>
              <Form.File.Input />
            </Form.File>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Price
          </Form.Label>
          <Col sm="4">
            <Form.Control
              required
              placeholder="price for a day"
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Col>
          <Form.Label column sm="2">
            Area
          </Form.Label>
          <Col sm="4">
            <Form.Control
              required
              onChange={(e) => setArea(e.target.value)}
              placeholder="m &sup2;"
            ></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Phone Contact
          </Form.Label>
          <Col sm="4">
            <Form.Control
              required
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone contact"
            ></Form.Control>
          </Col>
          <Form.Label column sm="2">
            Max Guest
          </Form.Label>
          <Col sm="4">
            <Form.Control
              required
              onChange={(e) => setMaxGuest(e.target.value)}
              placeholder="Max Guest available"
            ></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Property Type
          </Form.Label>
          <Col sm="4">
            <Form.Check
              controlId="AC"
              type="checkbox"
              label="AC"
              onChange={(e) => setAC(e.target.checked)}
            />
            <Form.Check
              type="checkbox"
              label="Wifi"
              onChange={(e) => setWifi(e.target.checked)}
            />
            <Form.Check
              type="checkbox"
              label="TV"
              onChange={(e) => setTV(e.target.checked)}
            />
            <Form.Check
              type="checkbox"
              label="Fridge"
              onChange={(e) => setFridge(e.target.checked)}
            />
            <Form.Check
              type="checkbox"
              label="Swimming pool"
              onChange={(e) => setPool(e.target.checked)}
            />
          </Col>
          <Form.Label column sm="2">
            BedRoom
          </Form.Label>
          <Col sm="4">
            <Form.Control
              required
              onChange={(e) => setBedRoom(e.target.value)}
              placeholder="How many bedroom?"
            ></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="country">
          <Form.Label column sm="2">
            Country
          </Form.Label>
          <Col sm="4">
            <Form.Control as="select" name="country" onChange={onSelectCountry}>
              <option value=""> Select country </option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </Form.Control>
          </Col>

          <Form.Label column sm="2">
            City
          </Form.Label>
          <Col sm="4">
            <Form.Control as="select" onChange={onSelectCity}>
              <option value=""> Select city </option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            onChange={(e) => setAddress(e.target.value)}
            placeholder="exact address"
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={5}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Full Description"
          ></Form.Control>
        </Form.Group>

        <Button
          variant="outline-secondary"
          size="lg"
          className="btn-Edit"
          as="input"
          type="submit"
          value="Save"
        />
      </Form>
      <NotificationContainer></NotificationContainer>
      <MultipleImageUploadComponent />
    </Container>
  );
};

export default PostHouse;

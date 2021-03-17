import React, { useState, useMemo } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import * as Locations from "laika-locations";
import "./EditProfile.css";
import userService from "../helper/userService";

const EditProfile = () => {
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");

  const [country, setCountry] = useState({});
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    userService.editprofile(password,firstname,lastname,birthday,country.name,city, address)
    .then(
       //success
    )
   }

  const { countries } = Locations.getCountries();

  const cities = useMemo(
    () => (country ? Locations.getCitiesByCountry(country.id) : []),
    [country]
  );

  const onSelectCountry = ({ currentTarget }) => {
    setCountry(countries[currentTarget.value - 1]);
  };

  const onSelectCity = ({ currentTarget }) => {
    setCity(Locations.getCityNameById(currentTarget.value));
  };
  return (
    <Form className="edit-form" onSubmit={onSubmit}>
      <h1> Edit Profile</h1>
      <Form.Group as={Row} controlId="Email">
        <Form.Label column sm="3">
          Email
        </Form.Label>
        <Col sm="9">
          <Form.Control plaintext readOnly defaultValue="load from database " />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="Password">
        <Form.Label column sm="3">
          Password
        </Form.Label>
        <Col sm="9">
          <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="firstname">
        <Form.Label column sm="3">
          First Name
        </Form.Label>
        <Col sm="9">
          <Form.Control placeholder="First name" onChange = {e =>setFirstName(e.target.value)} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="lastname">
        <Form.Label column sm="3">
          Last Name
        </Form.Label>
        <Col sm="9">
          <Form.Control placeholder="Last name" onChange = {e => setLastName(e.target.value)} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="birthday">
        <Form.Label column sm="3">
          Birthday
        </Form.Label>
        <Col sm="9">
          <Form.Control as="input" type="date" onChange = {e => setBirthday(e.target.value)} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="country">
        <Form.Label column sm="3">
          Country
        </Form.Label>
        <Col sm="9">
          <Form.Control as="select" name="country" onChange={onSelectCountry}>
            <option value=""> Select country </option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="city">
        <Form.Label column sm="3">
          City
        </Form.Label>
        <Col sm="9">
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

      <Form.Group as={Row} controlId="address">
        <Form.Label column sm="3">
          Address
        </Form.Label>
        <Col sm="9">
          <Form.Control as= "input" placeholder="Address"  onChange = {e => setAddress(e.target.value)}/>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Col sm="6">
          <Button
            variant="outline-secondary"
            size="lg"
            className="btn-Edit"
            as="input"
            type="submit"
            value="Save"
          />
        </Col>
        <Col sm="6">
          <Button
            variant="outline-danger"
            size="lg"
            className="btn-Edit"
            as="input"
            type="reset"
            value="Reset"
          />
        </Col>
      </Form.Group>
    </Form>
  );
};

export default EditProfile;

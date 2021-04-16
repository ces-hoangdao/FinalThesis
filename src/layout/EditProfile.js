import React, { useState, useMemo, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import * as Locations from "laika-locations";
import "./EditProfile.css";
import UserService from "../services/UserService";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { ROUTE } from "../constants/route";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

const EditProfile = () => {
  const email = localStorage.getItem("email");
  const [userInfo, setUserinfo] = useState({
    id: "",
    firstName: "",
    lastName: "",
    birthday: "",
    country: "",
    city: "",
    address: "",
  });

  const isLogin = localStorage.getItem("token");

  const onSubmit = (e) => {
    e.preventDefault();
    new UserService()
      .editprofile(
        userInfo.id,
        userInfo.firstName,
        userInfo.lastName,
        userInfo.birthday,
        Locations.getCountryById(userInfo.country).name,
        Locations.getCityNameById(userInfo.city),
        userInfo.address
      )
      .then
      //success
      ();
  };
  
  //fetch data from database
  useEffect(() => {
    new UserService().getCurrentUser().then((data) => {
      if (data !== null) {
        setUserinfo({
          ...userInfo,
          ...data,
          country: countries.find((c) => c.name === data.country).id,
          city: Locations.getCitiesByParam(data.city)[0].id,
        });
      }
    });
  }, []);

  //get country and city
  const { countries } = Locations.getCountries();

  console.log(countries.find((c) => c.name === 'Vietnam').id);

  const cities = useMemo(
    () =>
      userInfo.country ? Locations.getCitiesByCountry(userInfo.country) : [],
    [userInfo.country]
  );

  console.log(cities);

  const onSelectCountry = ({ currentTarget }) => {
    setUserinfo({
      ...userInfo,
      country: currentTarget.value,
    });
    console.log(currentTarget.value);
  };

  const onSelectCity = ({ currentTarget }) => {
    setUserinfo({
      ...userInfo,
      city: currentTarget.value,
    });
  };

  if (isLogin == null) {
    return <Redirect to="/login"></Redirect>;
  }
  return (
    <Form className="edit-form" onSubmit={onSubmit}>
      <h1> Edit Profile</h1>
      <CountryDropdown></CountryDropdown>
      <Form.Group as={Row} controlId="Email">
        <Form.Label column sm="3">
          Email
        </Form.Label>
        <Col sm="9">
          <Form.Control plaintext readOnly defaultValue={email} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="firstName">
        <Form.Label column sm="3">
          First Name
        </Form.Label>
        <Col sm="9">
          <Form.Control
            placeholder="First name"
            onChange={(e) =>
              setUserinfo({
                ...userInfo,
                firstName: e.target.value,
              })
            }
            value={userInfo.firstName}
          ></Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="lastName">
        <Form.Label column sm="3">
          Last Name
        </Form.Label>
        <Col sm="9">
          <Form.Control
            placeholder="Last name"
            value={userInfo.lastName}
            onChange={(e) =>
              setUserinfo({
                ...userInfo,
                lastName: e.target.value,
              })
            }
          ></Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="birthday">
        <Form.Label column sm="3">
          birthday
        </Form.Label>
        <Col sm="9">
          <Form.Control
            as="input"
            type="date"
            value={userInfo.birthday}
            onChange={(e) =>
              setUserinfo({
                ...userInfo,
                birthday: e.target.value,
              })
            }
          ></Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="country">
        <Form.Label column sm="3">
          Country
        </Form.Label>
        <Col sm="9">
          <Form.Control as="select" name="country" onChange={onSelectCountry}>
            {countries.map((countryObj) => (
              <option
                key={countryObj.id}
                value={countryObj.id}
                selected={countryObj.id === +userInfo.country}
              >
                {countryObj.name}
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
            {cities.map((cityObj) => (
              <option
                key={cityObj.id}
                value={cityObj.id}
                selected={cityObj.id === +userInfo.city}
              >
                {cityObj.name}
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
          <Form.Control
            as="input"
            placeholder="Address"
            value={userInfo.address}
            onChange={(e) =>
              setUserinfo({
                ...userInfo,
                address: e.target.value,
              })
            }
          ></Form.Control>
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

      <NotificationContainer></NotificationContainer>
    </Form>
  );
};

export default EditProfile;

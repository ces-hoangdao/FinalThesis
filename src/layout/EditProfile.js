import React, { useState, useMemo, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import * as Locations from "laika-locations";
import "./EditProfile.css";
import userService from "../helper/userService";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { ROUTE } from "../constants/route";

const EditProfile = () => {
  const email = localStorage.getItem("email");
  const [userinfo, setUserinfo] = useState({
    firstname: "",
    lastname: "",
    birthday: "",
    country: "",
    city: "",
    address: "",
  });

  const isLogin = localStorage.getItem("token");

  const onSubmit = (e) => {
    e.preventDefault();
    new userService()
      .editprofile(
        userinfo.firstname,
        userinfo.lastname,
        userinfo.birthday,
        Locations.getCountryById(userinfo.country).name,
        Locations.getCityNameById(userinfo.city),
        userinfo.address
      )
      .then
      //success
      ();
  };

  //fetch data from database
  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const URL = ROUTE.USERDETAIL_PATH;
        const response = await axios.get(URL, {
          headers: { Authorization: "Token " + localStorage.getItem("token") },
        });
        setUserinfo({
          ...userinfo,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          birthday: response.data.birthday,
          country: countries.find((c) => c.name === response.data.country).id,
          city: Locations.getCitiesByParam(response.data.city)[0].id,
          address: response.data.address,
        });
      } catch (err) {
        //error
      }
    }
    fetchUserInfo();
  }, []);

  //get country and city
  const { countries } = Locations.getCountries();

  const cities = useMemo(
    () => (userinfo.country ? Locations.getCitiesByCountry(userinfo.country.id) : []),
    [userinfo.country]
  );

  const onSelectCountry = ({ currentTarget }) => {
    setUserinfo({
      ...userinfo,
      country: currentTarget.value,
    });
  };

  const onSelectCity = ({ currentTarget }) => {
    setUserinfo({
      ...userinfo,
      city: currentTarget.value,
    });
  };

  if (isLogin == null) {
    return <Redirect to="/login"></Redirect>;
  }
  return (
    <Form className="edit-form" onSubmit={onSubmit}>
      <h1> Edit Profile</h1>

      <Form.Group as={Row} controlId="Email">
        <Form.Label column sm="3">
          Email
        </Form.Label>
        <Col sm="9">
          <Form.Control plaintext readOnly defaultValue={email} />
          <Form.Control plaintext readOnly defaultValue="load from database " />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="firstname">
        <Form.Label column sm="3">
          First Name
        </Form.Label>
        <Col sm="9">
          <Form.Control
            placeholder="First name"
            onChange={(e) =>
              setUserinfo({
                ...userinfo,
                firstname: e.target.value,
              })
            }
            value={userinfo.firstname}
          ></Form.Control>       
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="lastname">
        <Form.Label column sm="3">
          Last Name
        </Form.Label>
        <Col sm="9">
          <Form.Control
            placeholder="Last name"
            value={userinfo.lastname}
            onChange={(e) =>
              setUserinfo({
                ...userinfo,
                lastname: e.target.value,
              })
            }
          ></Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="birthday">
        <Form.Label column sm="3">
          Birthday
        </Form.Label>
        <Col sm="9">
          <Form.Control
            as="input"
            type="date"
            value={userinfo.birthday}
            onChange={(e) =>
              setUserinfo({
                ...userinfo,
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
                selected={countryObj.id === +userinfo.country}
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
                selected={cityObj.id === +userinfo.city}
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
            value={userinfo.address}
            onChange={(e) => setUserinfo({
              ...userinfo,
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

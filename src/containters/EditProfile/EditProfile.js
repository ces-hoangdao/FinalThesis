import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import "./EditProfile.css";
import UserService from "../../services/UserService";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Redirect } from "react-router-dom";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const EditProfile = () => {
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    birthday: "",
    country: "",
    city: "",
    address: "",
  });

  const email = localStorage.getItem("email");
  const isLogin = localStorage.getItem("token");

  const onSubmit = (e) => {
    e.preventDefault();
    new UserService()
      .editprofile(user)
      .then((response) => {
        if (response.status < 300) {
          NotificationManager.success(response.message);
          setUser({ ...response.data })
        } else {
          NotificationManager.error(response.message);
        }
      })
      .catch((error) => {
        NotificationManager.error('Something went wrong!');
      });
  };

  //fetch data from database
  useEffect(() => {
    new UserService()
      .getCurrentUser()
      .then((response) => {
        if (response.status < 300) {
          NotificationManager.success(response.message);
          setUser({ ...response.data })
        } else {
          NotificationManager.error(response.message);
        }
      })
      .catch((error) => {
        NotificationManager.error('Something went wrong!');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectCountry = (val) => {
    setUser({ ...user, country: val });
  };

  const selectRegion = (val) => {
    setUser({ ...user, city: val });
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
              setUser({
                ...user,
                firstName: e.target.value,
              })
            }
            value={user.firstName}
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
            value={user.lastName}
            onChange={(e) =>
              setUser({
                ...user,
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
            value={user.birthday}
            onChange={(e) =>
              setUser({
                ...user,
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
          <CountryDropdown
            className="form-control"
            defaultOptionLabel="Select a country"
            value={user.country}
            onChange={(val) => selectCountry(val)}
          ></CountryDropdown>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="city">
        <Form.Label column sm="3">
          City
        </Form.Label>
        <Col sm="9">
          <RegionDropdown
            className="form-control"
            blankOptionLabel="No country is selected"
            defaultOptionLabel="Select a city"
            country={user.country}
            value={user.city}
            onChange={(val) => selectRegion(val)}
          ></RegionDropdown>
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
            value={user.address}
            onChange={(e) =>
              setUser({
                ...user,
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

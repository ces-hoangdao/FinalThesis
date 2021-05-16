import React, { useState } from "react";
import { Container, Form, Row, Col, Button, Spinner } from "react-bootstrap";
import HouseService from "../../services/HouseService";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { DEFAULT_ERROR_MESSAGE } from "../../constants/message";
import { Redirect,useHistory  } from "react-router-dom";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const AddHouse = () => {
  const [house, setHouse] = useState({
    title: "",
    content: "",
    price: 0,
    size: 0,
    maxGuest: 0,
    phoneContact: "",
    bedroom: 0,
    country: "",
    city: "",
    address: "",
    airConditioner: false,
    wifi: false,
    tivi: false,
    fridge: false,
    swimPool: false,
    image: "",
    images: [],
  });
  const isLogin = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    new HouseService()
      .addHouse(house)
      .then((response) => {
        if (response.status < 300) {
          NotificationManager.success(response.message);
          setLoading(false);
          history.push("/hostmanage");
        } else {
          NotificationManager.error(response.message);
          setLoading(false);
        }
      })
      .catch((error) => {
        NotificationManager.error(DEFAULT_ERROR_MESSAGE);
        setLoading(false);
      });
  };

  const selectCountry = (val) => {
    setHouse({ ...house, country: val });
  };

  const selectRegion = (val) => {
    setHouse({ ...house, city: val });
  };

  if (isLogin == null) {
    return <Redirect to="/login"></Redirect>;
  }

  return (
    <Container className="Margin">
      <h1>Add New House</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group as={Row} controlId="HouseTitle">
          <Form.Label column sm="2">
            Title
          </Form.Label>
          <Col sm="4">
            <Form.Control
              required
              onChange={(e) =>
                setHouse({
                  ...house,
                  title: e.target.value,
                })
              }
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
              onChange={(e) =>
                setHouse({
                  ...house,
                  price: parseInt(e.target.value),
                })
              }
            ></Form.Control>
          </Col>
          <Form.Label column sm="2">
            Area
          </Form.Label>
          <Col sm="4">
            <Form.Control
              required
              onChange={(e) =>
                setHouse({
                  ...house,
                  size: parseInt(e.target.value),
                })
              }
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
              onChange={(e) =>
                setHouse({
                  ...house,
                  phoneContact: e.target.value,
                })
              }
              placeholder="Phone contact"
            ></Form.Control>
          </Col>
          <Form.Label column sm="2">
            Max Guest
          </Form.Label>
          <Col sm="4">
            <Form.Control
              required
              onChange={(e) =>
                setHouse({
                  ...house,
                  maxGuest: parseInt(e.target.value),
                })
              }
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
              onChange={(e) =>
                setHouse({
                  ...house,
                  ac: e.target.checked,
                })
              }
            />
            <Form.Check
              type="checkbox"
              label="Wifi"
              onChange={(e) =>
                setHouse({
                  ...house,
                  wifi: e.target.checked,
                })
              }
            />
            <Form.Check
              type="checkbox"
              label="TV"
              onChange={(e) =>
                setHouse({
                  ...house,
                  tivi: e.target.checked,
                })
              }
            />
            <Form.Check
              type="checkbox"
              label="Fridge"
              onChange={(e) =>
                setHouse({
                  ...house,
                  fridge: e.target.checked,
                })
              }
            />
            <Form.Check
              type="checkbox"
              label="Swimming pool"
              onChange={(e) =>
                setHouse({
                  ...house,
                  pool: e.target.checked,
                })
              }
            />
          </Col>
          <Form.Label column sm="2">
            BedRoom
          </Form.Label>
          <Col sm="4">
            <Form.Control
              required
              onChange={(e) =>
                setHouse({
                  ...house,
                  bedroom: parseInt(e.target.value),
                })
              }
              placeholder="How many bedroom?"
            ></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="country">
          <Form.Label column sm="2">
            Country
          </Form.Label>
          <Col sm="4">
            <CountryDropdown
              className="form-control"
              defaultOptionLabel="Select a country"
              value={house.country}
              onChange={(val) => selectCountry(val)}
            ></CountryDropdown>
          </Col>

          <Form.Label column sm="2">
            City
          </Form.Label>
          <Col sm="4">
            <RegionDropdown
              className="form-control"
              blankOptionLabel="No country is selected"
              defaultOptionLabel="Select a city"
              country={house.country}
              value={house.city}
              onChange={(val) => selectRegion(val)}
            ></RegionDropdown>
          </Col>
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            onChange={(e) =>
              setHouse({
                ...house,
                address: e.target.value,
              })
            }
            placeholder="exact address"
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={5}
            onChange={(e) =>
              setHouse({
                ...house,
                content: e.target.value,
              })
            }
            placeholder="Full Description"
          ></Form.Control>
        </Form.Group>
        {loading === true ? (
          <Button variant="primary" disabled className="btn-login">
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Creating...
          </Button>
        ) : (
          <Button
            variant="outline-secondary"
            size="lg"
            className="btn-Edit"
            as="input"
            type="submit"
            value="Save"
          />
        )}
      </Form>
      <NotificationContainer></NotificationContainer>
    </Container>
  );
};

export default AddHouse;

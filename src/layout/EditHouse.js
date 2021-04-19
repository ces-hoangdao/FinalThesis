import React, { useMemo, useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import * as Locations from "laika-locations";
import UserService from "../services/UserService";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Redirect } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
import queryString from "query-string";

const EditHouse = () => {
  const [loading, setLoading] = useState(false);

  const isLogin = localStorage.getItem("token");

  const [houseId, sethouseId] = useState({
    houseId: window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1
    ),
  });

  const [houseinfo, setHouseinfo] = useState({
    title: "",
    description: "",
    price: "",
    area: "",
    maxguest: "",
    phone: "",
    bedroom: "",
    country: "",
    city: "",
    address: "",
    ac: false,
    wifi: false,
    tivi: false,
    fridge: false,
    pool: false,
  });
  //fetch data from database
  useEffect(() => {
    async function fetchHouse() {
      try {
        setLoading(true);
        const paramsString = queryString.stringify(houseId);
        const requestUrl = `https://thesis-homestay.herokuapp.com/houses/detail?${paramsString}`;
        const response = await axios.get(requestUrl);
        setHouseinfo({
          ...houseinfo,
          title: response.data.title,
          description: response.data.content,
          price: response.data.price,
          area: response.data.size,
          maxguest: response.data.maxGuest,
          phone: response.data.phoneContact,
          bedroom: response.data.bedroom,
          country: countries.find((c) => c.name === response.data.country).id,
          city: Locations.getCitiesByParam(response.data.city)[0].id,
          address: response.data.address,
          ac: response.data.airConditioner,
          tivi: response.data.tivi,
          wifi: response.data.wifi,
          fridge: response.data.fridge,
          pool: response.data.swimPool,
        });
        setLoading(false);
      } catch (err) {
        //error
      }
    }
    fetchHouse();
  }, [houseId]);

  //get country and city
  const { countries } = Locations.getCountries();

  const cities = useMemo(
    () =>
      houseinfo.country ? Locations.getCitiesByCountry(houseinfo.country) : [],
    [houseinfo.country]
  );

  const onSelectCountry = ({ currentTarget }) => {
    setHouseinfo({
      ...houseinfo,
      country: currentTarget.value,
    });
  };

  const onSelectCity = ({ currentTarget }) => {
    setHouseinfo({
      ...houseinfo,
      city: currentTarget.value,
    });
  };

  //onSubmit function
  const onSubmit = (e) => {
    e.preventDefault();

    new UserService ()
      .edithouse(
        houseinfo.id,
        houseinfo.address,
        houseinfo.ac,
        houseinfo.bedroom,
        houseinfo.description,
        Locations.getCountryById(houseinfo.country).name,
        houseinfo.fridge,
        houseinfo.maxguest,
        houseinfo.phone,
        houseinfo.price,
        Locations.getCityNameById(houseinfo.city),
        houseinfo.area,
        houseinfo.pool,
        houseinfo.title,
        houseinfo.wifi,
        houseinfo.tivi
      )
      .then(
        () => {
          NotificationManager.success("Edit House success");
          window.location.reload();
        },
        (error) => {
          NotificationManager.error("Have Something wrong");
        }
      );
  };
  //check login
  if (isLogin == null) {
    return <Redirect to="/login"></Redirect>;
  }
  return (
    <Container>
      <h1>Edit House</h1>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Form onSubmit={onSubmit}>
          <Form.Group as={Row} controlId="HouseTitle">
            <Form.Label column sm="2">
              Title
            </Form.Label>
            <Col sm="4">
              <Form.Control
                required
                value={houseinfo.title}
                onChange={(e) =>
                  setHouseinfo({ ...houseinfo, title: e.target.value })
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
                value={houseinfo.price}
                onChange={(e) =>
                  setHouseinfo({ ...houseinfo, price: e.target.value })
                }
              ></Form.Control>
            </Col>
            <Form.Label column sm="2">
              Area
            </Form.Label>
            <Col sm="4">
              <Form.Control
                required
                value={houseinfo.area}
                onChange={(e) =>
                  setHouseinfo({ ...houseinfo, area: e.target.value })
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
                value={houseinfo.phone}
                onChange={(e) =>
                  setHouseinfo({ ...houseinfo, phone: e.target.value })
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
                value={houseinfo.maxguest}
                onChange={(e) =>
                  setHouseinfo({ ...houseinfo, maxguest: e.target.value })
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
                defaultChecked={houseinfo.ac}
                onChange={(e) =>
                  setHouseinfo({ ...houseinfo, ac: e.target.checked })
                }
              />
              <Form.Check
                type="checkbox"
                label="Wifi"
                defaultChecked={houseinfo.wifi}
                onChange={(e) =>
                  setHouseinfo({ ...houseinfo, wifi: e.target.checked })
                }
              />
              <Form.Check
                type="checkbox"
                label="TV"
                defaultChecked={houseinfo.tivi}
                onChange={(e) =>
                  setHouseinfo({ ...houseinfo, tivi: e.target.checked })
                }
              />
              <Form.Check
                type="checkbox"
                label="Fridge"
                defaultChecked={houseinfo.fridge}
                onChange={(e) =>
                  setHouseinfo({ ...houseinfo, fridge: e.target.checked })
                }
              />
              <Form.Check
                type="checkbox"
                label="Swimming pool"
                defaultChecked={houseinfo.pool}
                onChange={(e) =>
                  setHouseinfo({ ...houseinfo, pool: e.target.checked })
                }
              />
            </Col>
            <Form.Label column sm="2">
              BedRoom
            </Form.Label>
            <Col sm="4">
              <Form.Control
                required
                value={houseinfo.bedroom}
                onChange={(e) =>
                  setHouseinfo({ ...houseinfo, bedroom: e.target.value })
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
              <Form.Control
                as="select"
                name="country"
                onChange={onSelectCountry}
              >
                {countries.map((countryObj) => (
                  <option
                    key={countryObj.id}
                    value={countryObj.id}
                    selected={countryObj.id === +houseinfo.country}
                  >
                    {countryObj.name}
                  </option>
                ))}
              </Form.Control>
            </Col>

            <Form.Label column sm="2">
              City
            </Form.Label>
            <Col sm="4">
              <Form.Control as="select" onChange={onSelectCity}>
                {cities.map((cityObj) => (
                  <option
                    key={cityObj.id}
                    value={cityObj.id}
                    selected={cityObj.id === +houseinfo.city}
                  >
                    {cityObj.name}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              required
              value={houseinfo.address}
              onChange={(e) =>
                setHouseinfo({ ...houseinfo, address: e.target.value })
              }
              placeholder="exact address"
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={10}
              value={houseinfo.description}
              onChange={(e) =>
                setHouseinfo({ ...houseinfo, description: e.target.value })
              }
              placeholder="Full Description"
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Row}>
            <Col>
              <Button
                variant="outline-secondary"
                size="lg"
                className="btn-Edit"
                as="input"
                type="submit"
                value="Save"
              />
            </Col>
            <Col>
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
      )}

      <NotificationContainer></NotificationContainer>
    </Container>
  );
};
export default EditHouse;

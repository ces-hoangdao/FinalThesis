import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { RegionDropdown } from "react-country-region-selector";
import { NotificationContainer, NotificationManager, } from "react-notifications";

import notfound from "../../assets/not-found.svg";
import Pagination from "../../components/Pagination";
import Loader from "../../components/Loader";
import House from "../../components/House/House";
import { DEFAULT_ERROR_MESSAGE } from "../../constants/message";
import HouseService from "../../services/HouseService";

import "bootstrap/dist/css/bootstrap.min.css";
import "./ListHouse.css";

const DEFAULT_FILTER = {
  size: 20,
  page: 0,
  airConditioner: false,
  fridge: false,
  highestGuest: 100,
  lowestGuest: 0,
  highestPrice: 50000000,
  lowestPrice: 0,
  highestSize: 50000,
  lowestSize: 0,
  swimPool: false,
  tivi: false,
  wifi: false,
  city: "",
};

const HomeList = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notfoundpage, setNotFoundPage] = useState(false);
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [search, setSearch] = useState(DEFAULT_FILTER);

  useEffect(() => {
    setLoading(true);
    new HouseService()
      .getHouses(filter)
      .then((response) => {
        if (response.status < 300) {
          NotificationManager.success(response.message);
          setHouses(response.data.listObject);
          setLoading(false);
        } else {
          NotificationManager.error(response.message);
        }
      })
      .catch((error) => {
        NotificationManager.error(DEFAULT_ERROR_MESSAGE);
      });
  }, [filter]);

  const selectRegion = (val) => {
    setSearch({ ...search, city: val });
  };

  function handlePageChange(newPage) {
    setFilter({
      ...filter,
      page: newPage,
    });
  }

  return (
    <div>
      <div className="cover">
        <h1 className="title-result">TOP RESULTS</h1>
      </div>
      <div className="container result">
        <Row>
          <aside className="col-md-3">
            <Form>
              <Form.Group>
                <Form.Label as="legend">City</Form.Label>
                <Col>
                  <RegionDropdown
                    className="form-control"
                    defaultOptionLabel="Select city"
                    country={"Vietnam"}
                    value={search.city}
                    onChange={(val) => selectRegion(val)}
                  ></RegionDropdown>
                </Col>
              </Form.Group>

              <Form.Group>
                <Form.Label as="legend">Price </Form.Label>
                <Col>
                  {" "}
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      setSearch({ ...search, lowestPrice: e.target.value });
                    }}
                    placeholder="From: đ"
                  />
                  -{" "}
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      setSearch({ ...search, highestPrice: e.target.value });
                    }}
                    placeholder="To: đ"
                  />
                </Col>
              </Form.Group>

              <Form.Group>
                <Form.Label as="legend">Price </Form.Label>
                <Col>
                  {" "}
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      setSearch({ ...search, lowestPrice: e.target.value });
                    }}
                    placeholder="From: đ"
                  />
                  -{" "}
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      setSearch({ ...search, highestPrice: e.target.value });
                    }}
                    placeholder="To: đ"
                  />
                </Col>
              </Form.Group>

              <Form.Group>
                <Form.Label as="legend">Size</Form.Label>
                <Col>
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      setSearch({ ...search, lowestSize: e.target.value });
                    }}
                    placeholder="From: m&sup2;"
                  />
                  -{" "}
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      setSearch({ ...search, highestSize: e.target.value });
                    }}
                    placeholder="To: m&sup2;"
                  />
                </Col>
              </Form.Group>
              <Form.Group>
                <Form.Label as="legend">How many people?</Form.Label>
                <Col>
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      setSearch({ ...search, lowestGuest: e.target.value });
                    }}
                    placeholder="Min "
                  />
                  -{" "}
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      setSearch({ ...search, highestGuest: e.target.value });
                    }}
                    placeholder="Max "
                  />
                </Col>
              </Form.Group>
              <Form.Group>
                <Form.Label as="legend">Features</Form.Label>
                <Col>
                  <Form.Check
                    type="checkbox"
                    label="Air Conditioner"
                    onChange={(e) => {
                      setSearch({
                        ...search,
                        airConditioner: e.target.checked,
                      });
                    }}
                  ></Form.Check>
                  <Form.Check
                    type="checkbox"
                    label="Tivi"
                    onChange={(e) => {
                      setSearch({ ...search, tivi: e.target.checked });
                    }}
                  ></Form.Check>
                  <Form.Check
                    type="checkbox"
                    label="Wifi"
                    onChange={(e) => {
                      setSearch({ ...search, wifi: e.target.checked });
                    }}
                  ></Form.Check>
                  <Form.Check
                    type="checkbox"
                    label="Swimming Pool"
                    onChange={(e) => {
                      setSearch({ ...search, swimPool: e.target.checked });
                    }}
                  ></Form.Check>
                  <Form.Check
                    type="checkbox"
                    label="Fridge"
                    onChange={(e) => {
                      setSearch({ ...search, fridge: e.target.checked });
                    }}
                  ></Form.Check>
                </Col>
              </Form.Group>
              <Button
                className="btn-filter"
                variant="success"
                size="lg"
                onClick={(e) => {
                  setFilter(search);
                }}
              >
                Apply
              </Button>
              <Button
                className="btn-filter"
                variant="danger"
                size="lg"
                type="reset"
              >
                Clear
              </Button>
            </Form>
          </aside>
          <main className="col-md-9">
            {loading ? (
              <Loader></Loader>
            ) : (
              <>
                {notfoundpage ? (
                  <div className="notfound">
                    <h3> Sorry! No Results Found : </h3>
                    <img src={notfound} alt="Not Found"></img>
                    <h5>
                      We're sorry what you were looking for. Please try another
                      way
                    </h5>
                  </div>
                ) : (
                  <Row>
                    {houses.length !== 0
                      ? houses.map((house, index) => {
                          return <House key={index} house={house} />;
                        })
                      : null}
                    <Pagination
                      pagination={filter}
                      onPageChange={handlePageChange}
                    ></Pagination>
                  </Row>
                )}
              </>
            )}
          </main>
        </Row>
      </div>
      <NotificationContainer></NotificationContainer>
    </div>
  );
};
export default HomeList;

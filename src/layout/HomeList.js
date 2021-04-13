import React, { useState, useEffect } from "react";
import "./HomeList.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Card, Button } from "react-bootstrap";
import HouseFilters from "../components/HouseFilters/HouseFilters";
import axios from "axios";
import City from "../assets/ic-city@2x.svg";
import Price from "../assets/ic-price@2x.svg";
import Square from "../assets/ic-squarmeter@2x.svg";
import Pagination from "./Pagination";
import Loader from "../components/Loader";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { API_URL } from "../constants/route";

const HomeList = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    size: 20,
    page: 1,
  });

  useEffect(() => {
    async function fetchHouses() {
      try {
        setLoading(true);
        const paramsString = queryString.stringify(filter);
        const requestUrl = API_URL + `/houses?${paramsString}`;
        const response = await axios.get(requestUrl);
        setHouses(response.data.listHouse);
        setLoading(false);
      } catch (err) {
        //error
      }
    }

    fetchHouses();
  }, [filter]);
  //Effect chay lai moi lam filter thay doi

  function handlePageChange(newPage) {
    setFilter({
      ...filter,
      page: newPage,
    });
  }

  return (
    <div className="container">
      <h1>List Result</h1>
      <div>{loading && <Loader></Loader>}</div>
      <Row>
        <aside className="col-md-3">
          <HouseFilters></HouseFilters>
        </aside>
        <main className="col-md-9">
          <header className="border-bottom mb-4 pb-3">
            <div className="form-inline">
              <h4>Short by </h4>
              <select className="mr-2 form-control">
                <option>Latest items</option>
                <option>Trending</option>
                <option>Most Popular</option>
                <option>Cheapest</option>
              </select>
            </div>
          </header>

          <Row>
            
            {houses &&
              houses.map((house, index) => {
                return (
                  <div className="col-md-6" key={index}>
                    <Card className="card card-house-grid">
                      <div className="img-wrap">
                        <Card.Img src={house.image} alt="image" />
                      </div>
                      <Card.Body className="info-wrap">
                        <div className="fix-height">
                          <Card.Title> {house.title}</Card.Title>
                          <Card.Text className="price-wrap mt-2">
                            <img
                              className="icon-house"
                              src={Price}
                              alt=" price"
                            ></img>
                            <span className="text-house"> {house.price} đ</span>
                            <img
                              className="icon-house"
                              src={Square}
                              alt=" Squaremeter"
                            ></img>
                            <span className="text-house"> {house.size} m</span>
                            <img
                              className="icon-house"
                              src={City}
                              alt=" city"
                            ></img>
                            <span className="text-house"> {house.id}</span>
                          </Card.Text>
                        </div>
                        <Button variant="outline-dark" size="lg" block>
                          <Link to={"/housedetail/" + String(house.id)}>
                            Detail
                          </Link>
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}

            <Pagination
              pagination={filter}
              onPageChange={handlePageChange}
            ></Pagination>
          </Row>
        </main>
      </Row>
    </div>
  );  
};
export default HomeList;

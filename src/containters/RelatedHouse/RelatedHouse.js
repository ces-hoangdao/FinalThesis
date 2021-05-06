import React, { useState, useEffect } from "react";
import HouseService from "../../services/HouseService";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
function RelatedHouse(props) {
  const [houses, setHouses] = useState([]);
  const { houseId } = props;
  useEffect(() => {
    new HouseService()
      .getHouseRelated(houseId)
      .then((response) => {
        if (response.status < 300) {
          setHouses(response.data.listHouseRecommend);
        } 
              })
      
  }, []);
  return (
    <Row>
      {houses &&
        houses.map((house, index) => {
          return (
            <div className="col-md-4 " key={index}>
              <Card className="card card-house-grid">
                <Link to={"/housedetail/" + String(house.id)}>
                  <Card.Img className="img-wrap" src={house.image} alt="house" />
                </Link>
                <Card.Body className="info-wrap">
                  <Card.Title> {house.title}</Card.Title>
                  <Card.Text className="price-wrap mt-2">
                    <Row>
                      <Col>
                        <span className=""> Price: {house.price} đ/ day</span>
                      </Col>
                      <Col>
                        <span className="">
                          Property size: {house.size} m &sup2;
                        </span>
                      </Col>
                    </Row>
                    <span className="">City: {house.city}</span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          );
        })}
    </Row>
  );
}

export default RelatedHouse;

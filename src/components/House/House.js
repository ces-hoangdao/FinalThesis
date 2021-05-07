import React from "react";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

import { numberWithCommas } from "../../helper/helper";

import styles from "./House.module.css";

const House = (props) => {
  const { house } = props;
  return (
    <div className="col-md-6">
      <Card className="card-house">
        <Link to={"/housedetail/" + String(house.id)}>
          <Card.Img className="card-house-img" src={house.image} alt="house" />
        </Link>
        <Card.Body className="card-body">
          <Card.Title className={styles.Title}>{house.title}</Card.Title>
          <Card.Text className="info-content">
            <div className={styles.Container}>
              <div className={styles.TextContent}>Price: {numberWithCommas(house.price)} đ/ night</div>
              <div className={styles.TextContent}>City: {house.city}</div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
export default House;

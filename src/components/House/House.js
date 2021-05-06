
import React from 'react';
import { Card, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

import Location from "../../assets/location.svg";
import Price from "../../assets/price.svg";
import Square from "../../assets/ic-squarmeter@2x.svg";
import Icon from "../Icon/Icon";
import { numberWithCommas } from "../../helper/helper";
import styles from './House.module.css';
import "./House.css";

const House = (props) => {
  const { house } = props;
  return (
    <div className="col-md-6">
      <Card className="card-house">
        <Link to={"/housedetail/" + String(house.id)}>
          <Card.Img
            className="card-house-img"
            src={house.image}
            alt="house"
          />
        </Link>
        <Card.Body className="card-body">
          <Card.Title>{house.title}</Card.Title>
          <Card.Text className="info-content">
            <div className={styles.Container}>
              <Icon
                src={Price}
                text={numberWithCommas(house.price)}
                unit="/1day"
                classText="text-content"
                classIcon="icon-house"
              ></Icon>
              <Icon
                src={Location}
                text={house.city}
                classText="text-content"
                classIcon="icon-house"
              ></Icon>
              <Icon
                src={Square}
                text={house.size}
                unit="m &sup2;"
                classText="text-content"
                classIcon="icon-house"
              ></Icon>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
export default House;

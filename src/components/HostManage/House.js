import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";
import { Button } from "react-bootstrap";
import "./HostManage.css";
import notImg from "../../assets/loading-img.svg";

House.protoTypes = {
  houses: PropTypes.array,
  deactiveHouse: PropTypes.func,
  hiddenHouse: PropTypes.func,
  blockHouse: PropTypes.func,
};
function House(props) {
  const { houses, deactiveHouse, hiddenHouse,blockHouse } = props;
  const modifiedDate = new Date(houses.modifiedDate);
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

  let button = <></>;

  if(houses.status === "listed"){
    button = <><Button variant="secondary" onClick={() => hiddenHouse(houses.id)}>Hidden</Button></>;
  } else if (houses.status === "unlisted") {
    button = <><Button variant="primary" onClick={() => hiddenHouse(houses.id)}>Show</Button></>;
  } else {
    button = <></>;
  }

  return (
    <tr>
      <th className="text-center">{houses.id}</th>
      <th>
        {houses.image ? (
          <Icon src={houses.image} classIcon="Icon"></Icon>
        ) : (
          <Icon src={notImg} classIcon="Icon"></Icon>
        )}
      </th>
      <th className="Name-content">{houses.title}</th>
      <th className="Address-content">{houses.address}</th>
      <th className="text500">{houses.city}</th>
      <th className="status-house text500">{houses.status}</th>
      <th className="text500">{modifiedDate.toLocaleDateString()}</th>

      {isAdmin ? (
        <th className="text-center">
          {houses.block === true ? (
            <Button variant="warning"
              onClick={() => blockHouse(houses.id)}>
              UnBlock
            </Button>
          ) : (
            <Button
              variant="danger"
              onClick={() => blockHouse(houses.id)}
            >
              Block House
            </Button>
          )}
        </th>
      ) : (
        <>
          <th className="text-center">
            {button}
          </th>
          <th className="text-center">
            <Link to={"/edithouse/" + String(houses.id)}>
              <Button variant="warning">Edit</Button>
            </Link>
            <Button variant="danger"
              onClick={() => deactiveHouse(houses.id)} >Deactive</Button>
          </th>
        </>
      )}
    </tr>
  );
}

export default House;

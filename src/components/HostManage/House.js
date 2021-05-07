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
  const { houses, deactiveHouse, hiddenHouse, blockHouse,index } = props;
  const modifiedDate = new Date(houses.modifiedDate);
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

  let button = <></>;

  if (houses.block === true) {
    button = <>House blocked</>;
  } else if (houses.status === "listed") {
    button = (
      <>
        <Button variant="outline-secondary" onClick={() => hiddenHouse(houses.id,index)}>
          Hide
        </Button>
      </>
    );
  } else if (houses.status === "unlisted") {
    button = (
      <>
        <Button variant="outline-primary" onClick={() => hiddenHouse(houses.id,index)}>
          Show
        </Button>
      </>
    );
  } else {
    button = <></>;
  }

  let buttonDeactive = <></>;
  if (houses.block === true) {
    buttonDeactive = <></>;
  } else if (houses.status === "deactived") {
    buttonDeactive = <></>;
  } else {
    buttonDeactive = (
      <>
        {" "}
        <Link to={"/edithouse/" + String(houses.id)}>
          <Button variant="outline-warning" className='ButtonMargin'>Edit</Button>
        </Link>
        <Button variant="outline-danger" onClick={() => deactiveHouse(houses.id,index)}>
          Deactive
        </Button>
      </>
    );
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
            <Button variant="warning" onClick={() => blockHouse(houses.id,index)}>
              UnBlock
            </Button>
          ) : (
            <Button variant="danger" onClick={() => blockHouse(houses.id,index)}>
              Block House
            </Button>
          )}
        </th>
      ) : (
        <>
          <th className="text-center">{button}</th>
          <th className="text-center">{buttonDeactive}</th>
        </>
      )}
    </tr>
  );
}

export default House;

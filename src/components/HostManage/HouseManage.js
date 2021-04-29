import React, { useState, useEffect } from "react";
import { Form, Table, Button, Row } from "react-bootstrap";
import { NotificationManager } from "react-notifications";
import House from "./House";
import { Link } from "react-router-dom";
import HouseService from "../../services/HouseService";
import { DEFAULT_ERROR_MESSAGE } from "../../constants/message";
import TextHolder from "../PlaceHolder/TextHolder";
import ImageCard from "../PlaceHolder/ImageCard";

function HouseManage(props) {
  const { accountId } = props;
  const [loading, setLoading] = useState(false);
  const [houses, setHouses] = useState([]);
  const [paramsString, setParams] = useState({
    accountId: accountId,
    status: "",
  });
  useEffect(() => {
    setLoading(true);
    new HouseService()
      .getHouseForHost(paramsString)
      .then((response) => {
        if (response.status < 300) {
          setHouses(response.data.listObject);
          NotificationManager.success(response.message);
          setLoading(false);
        } else {
          NotificationManager.error(response.message);
          setLoading(false);
        }
      })
      .catch((error) => {
        NotificationManager.error(DEFAULT_ERROR_MESSAGE);
      });
  }, [paramsString]);

  const deactiveHouse = (houseId) => {
    const filteredHouse = houses.filter((item) => item.id !== houseId);
    new HouseService().deactiveHouse(houseId).then(
      () => {
        NotificationManager.success("Deactive House Success");
        setHouses(filteredHouse);
      },
      (error) => {
        NotificationManager.error(DEFAULT_ERROR_MESSAGE);
      }
    );
  };

  const hiddenHouse = (houseId) => {
    new HouseService().hiddenHouse(houseId).then(
      (responese) => {
        if (responese) {
          NotificationManager.success(responese.message);
        }
      },
      (error) => {
        NotificationManager.error(DEFAULT_ERROR_MESSAGE);
      }
    );
  };

  return (
    <div className="house-manager">
      <Row>
        <Form.Control
          as="select"
          className="filter-status"
          onChange={(e) => {
            setParams({ ...paramsString, status: e.target.value });
          }}
        >
          <option value="">All</option>
          <option value="listed">Listed</option>
          <option value="unlisted">UnListed</option>
          <option value="blocked">Blocked</option>
          <option value="deactived">Deactived</option>
        </Form.Control>
        <Link to="posthouse">
          <Button className="mr btn-housemanage">Create New House</Button>
        </Link>
      </Row>

      <Table striped>
        <thead>
          <tr className="">
            <th className="text-center">ID</th>
            <th></th>
            <th className="">Name</th>
            <th className="">Addresss</th>
            <th className="">City</th>
            <th>Status</th>
            <th className="">Last Edit</th>
            <th className="text-center">Show/Hidden</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

        {loading ? (
          <tbody className="House-holder">
            <th>
              <TextHolder></TextHolder>
            </th>
            <th>
              <ImageCard></ImageCard>
            </th>
            <th className="Name-content">
              <TextHolder></TextHolder>
            </th>
            <th>
              <TextHolder></TextHolder>
            </th>
            <th>
              <TextHolder></TextHolder>
            </th>
            <th>
              <TextHolder></TextHolder>
            </th>
            <th>
              <TextHolder></TextHolder>
            </th>
            <th className="text-center">
              <ImageCard></ImageCard>
            </th>
            <th className="text-center">
              <ImageCard></ImageCard>
            </th>
          </tbody>
        ) : (
          <tbody>
            {houses.map((houses, index) => {
              return (
                <House
                  houses={houses}
                  deactiveHouse={deactiveHouse}
                  hiddenHouse={hiddenHouse}
                  index={index}
                ></House>
              );
            })}
          </tbody>
        )}
      </Table>
      {houses.length === 0 ? (
        <div className="noresult">No house to display</div>
      ) : null}
    </div>
  );
}

export default HouseManage;

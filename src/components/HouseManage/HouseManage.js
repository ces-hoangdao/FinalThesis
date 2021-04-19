import React, { useState, useEffect } from "react";
import { Container, Table, Button, Spinner } from "react-bootstrap";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Link } from "react-router-dom";
import "./HouseManage.css";
import HouseService from "../../services/HouseService";

function HouseManage() {
  const [loading, setLoading] = useState(false);
  const username = localStorage.getItem("username");
  const [houses, setHouses] = useState([]);
  
  useEffect(() => {
    setLoading(true);
    new HouseService().getListHouseByUsername(username).then((response) => {
      if (response) {
        setHouses(response);
        setLoading(false);
      } else {
        NotificationManager.error("Don't have house to display");
        setLoading(false);
      }
    });
  }, []);

  const deleteHouse = (houseid) => {
    const filteredHouse = houses.filter((item) => item.id !== houseid);
    new HouseService().deleteHouse(houseid).then(
      () => {
        NotificationManager.success("Delete House Success");
        setHouses(filteredHouse);
      },
      (error) => {
        NotificationManager.error("Have Something Wrong");
      }
    );
  };
  return (
    <Container>
      <h1>House Management</h1>
      {loading ? (
        <Spinner animation="border" role="status"></Spinner>
      ) : (
        <div>
          <Link to="AddHouse">
            <Button className="mr">Add House</Button>
          </Link>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th>Title</th>
                <th>Country</th>
                <th>City</th>
                <th>PhoneContact</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {houses.map((houses, index) => {
                return (
                  <tr>
                    <th>{index + 1}</th>
                    <th>{houses.title}</th>
                    <th>{houses.country}</th>
                    <th>{houses.city}</th>
                    <th>{houses.phoneContact}</th>
                    <th>
                      <Link to={"/edithouse/" + String(houses.id)}>
                        {" "}
                        <Button
                          variant="outline-info"
                          className="btn-housemanage"
                        >
                          Edit
                        </Button>
                      </Link>

                      <Button
                        variant="outline-danger"
                        className="btn-housemanage"
                        onClick={() => deleteHouse(houses.id)}
                      >
                        Delete
                      </Button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}

      <NotificationContainer></NotificationContainer>
    </Container>
  );
}

export default HouseManage;

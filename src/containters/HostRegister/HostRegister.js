import React, { useState } from "react";
import { Form, Row, Col, Container, Button, Spinner } from "react-bootstrap";
import ProgressBarForHost from "../../comps/ProgressBarForHost";
import { motion } from "framer-motion";
import "./HostRegister.css";
import { useHistory } from "react-router-dom";
import UserService from "../../services/UserService";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { DEFAULT_ERROR_MESSAGE } from "../../constants/message";

function HostRegister() {
  const role = localStorage.getItem("role")
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [hostInfo, setHostInfo] = useState({
    fullName: "",
    idImage: "",
    idNo: "",
    issuedOn: "",
  });
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  const types = ["image/png", "image/jpeg", "image/jpg"];
  const changeHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please check type of image file(png/jpeg/jpg)");
    }
  };

 const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(hostInfo);
    new UserService()
    .HostRegister(hostInfo).then((response) => {
      if(response.status < 300){
        history.push("/hostmanage");
        setLoading(false);
      }else{
        setLoading(false);
        NotificationManager.error(response.message);
      }
    })
    .catch((error) => {
      NotificationManager.error(DEFAULT_ERROR_MESSAGE);
      setLoading(false);
    });
  }

  if(role ==="host"){
    history.push("/hostmanage");
  } 
  return (
    <Container>
      <h1>Host Register</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Full Name
          </Form.Label>
          <Col sm="4">
            <Form.Control
              required
              placeholder="Full Name"
              onChange={(e) =>
                setHostInfo({
                  ...hostInfo,
                  fullName: e.target.value,
                })
              }
            ></Form.Control>
          </Col>
          <Form.Label column sm="2">
            Mobile Number
          </Form.Label>
          <Col sm="4">
            <Form.Control required placeholder=" Mobile Number"></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Identity Card
          </Form.Label>
          <Col sm="4">
            <Form.Control
              required
              placeholder="Identity Card"
              onChange={(e) =>
                setHostInfo({
                  ...hostInfo,
                  idNo: e.target.value,
                })
              }
            ></Form.Control>
          </Col>
          <Form.Label column sm="2">
            Date Range
          </Form.Label>
          <Col sm="4">
            <Form.Control
              required
              type="date"
              onChange={(e) =>
                setHostInfo({
                  ...hostInfo,
                  issuedOn: e.target.value,
                })
              }
            ></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col className="up-image">
            <form>
              <label>Image Identity Card </label>
              <input type="file" onChange={changeHandler}></input>

              <div className="output">
                {error && <div className="errorMessage">{error}</div>}
                {file && <div>{file.name}</div>}
                {file && (
                  <ProgressBarForHost
                    file={file}
                    setFile={setFile}
                    setHostInfo={setHostInfo}
                    hostInfo={hostInfo}
                  />
                )}
                {hostInfo.IdImage && (
                  <motion.div className="" layout whileHover={{ opacity: 1 }}>
                    <motion.img
                      src={hostInfo.IdImage}
                      alt="uploaded pic"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    />
                  </motion.div>
                )}
              </div>
            </form>
          </Col>
          <Col></Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col>
            {loading === true ? (
              <Button variant="primary" disabled className="btn-login">
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </Button>
            ) : (
              <Button
                variant="outline-secondary"
                size="lg"
                className="btn-Edit"
                as="input"
                type="submit"
                value="Save"
              />
            )}
          </Col>
          <Col>
            <Button
              variant="outline-danger"
              size="lg"
              className="btn-Edit"
              type="reset"
            >
              Cancel
            </Button>
          </Col>
        </Form.Group>
      </Form>
      <NotificationContainer/>
    </Container>
  );
}

export default HostRegister;

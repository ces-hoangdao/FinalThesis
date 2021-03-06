import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import AuthService from "../services/AuthService";
import "./ConfirmCode.css";

const ConfirmCode = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.confirmCode(verifycode).then(window.location.replace("/"));
  };

  const [verifycode, setVerifycode] = useState("");
  return (
    <Form onSubmit={onSubmit} className="form-confirm">
      <Form.Group>
        <Form.Label>Verify Code</Form.Label>
        <Form.Control
          as="input"
          onChange={(e) => setVerifycode(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Button type="submit" className="btn-confirm">
        Verify Code
      </Button>
    </Form>
  );
};
export default ConfirmCode;

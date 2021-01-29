import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import authService from "../helper/authService";
import "./Login.css";
import {
  PASSWORD_MIN_LENGTH,
  emailRegex,
  formValid,userConstants
} from "../constants/formValidation";


class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      confirmPassword: null,
      isLogin: false,
      formErrors: {
        email: "",
        password: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if (formValid(this.state)) {
      const email = this.state.email;
      const password = this.state.password;
      authService.login(email, password)
       .then(() =>{
        alert(userConstants.LOGIN_SUCCESS);

         window.location.reload();

       },
       (error) => {
        alert(userConstants.LOGIN_FAILURE);
      }

       );
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < PASSWORD_MIN_LENGTH
            ? "minimum 6 characters required"
            : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };


  render() {
    const { formErrors } = this.state;
    return (
      <div className="container">
        <Form className="form-login" onSubmit={this.handleSubmit} noValidate>
          <h1>Register</h1>
          <Form.Group controlId="Email">
            <Form.Label>Email address</Form.Label>
            <Form.Control  className={formErrors.email.length > 0 ? "error" : null}
              placeholder="Enter email"
              type="email"
              name="email"
              noValidate
              onChange={this.handleChange}
            />
            {formErrors.email.length > 0 && (
              <span className="errorMessage">{formErrors.email}</span>
            )}
          </Form.Group>

          <Form.Group controlId="Password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className={formErrors.password.length > 0 ? "error" : null}
              type="password"
              placeholder="Password"
              name="password"
              noValidate
              onChange={this.handleChange}
            />
            {formErrors.password.length > 0 && (
              <span className="errorMessage">{formErrors.password}</span>
            )}
          </Form.Group>
          <Button variant="outline-dark" type="submit" className="btn-login">
            Register
          </Button>
          <h1 className="form-text">
           I have an account <Link to ="/login">Login</Link>
          </h1>
        </Form>
      </div>
    );
  }
}

export default Register;

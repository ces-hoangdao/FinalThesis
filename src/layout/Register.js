import React, { Component } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Link, Redirect } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import AuthService from "../services/AuthService";
import "./Login.css";
import {
  emailRegex,
  formValid,
  usernameRegex,
  passwordRegex,
  userConstants,
} from "../constants/formValidation";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      username: null,
      password: null,
      confirmPassword: null,
      isLogin: false,
      formErrors: {
        email: "",
        password: "",
        username: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit = (e) => {

    e.preventDefault();
    
    if (formValid(this.state))
     {
      //CAll API Register
      const email = this.state.email;
      const password = this.state.password;
      const username = this.state.username;
      AuthService.register(email, username, password).then(
        () => {
          NotificationManager.success(userConstants.REGISTER_SUCCESS);
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
          NotificationManager.error(userConstants.REGISTER_FAILURE);
        });
    } else {
      NotificationManager.error(userConstants.REGISTER_FAILURE);    
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
        formErrors.password = passwordRegex.test(value)
          ? ""
          : "Invalid password";
        break;
      case "username":
        formErrors.username = usernameRegex.test(value)
          ? ""
          : "Invalid username";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  render() {
    var logged = localStorage.getItem("username");
    if (logged !== null) {
      return <Redirect to="/"></Redirect>;
    }
    const { formErrors } = this.state;
    return (
      <div className="container">
        <Form className="form-login" onSubmit={this.handleSubmit} noValidate>
          <h1>Register</h1>
          <Form.Group controlId="Email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className={formErrors.email.length > 0 ? "error" : null}
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
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
            className={formErrors.username.length > 0 ? "error" : null}
              type="text"
              placeholder="Username"
              name="username"
              noValidate
              onChange={this.handleChange}
            />      
            {formErrors.username.length > 0 && (
              <span className="errorMessage">{formErrors.username}</span>
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
            I have an account <Link to="/login">Login</Link>
          </h1>
        </Form>
        <NotificationContainer></NotificationContainer>
      </div>
    );
  }
}

export default Register;

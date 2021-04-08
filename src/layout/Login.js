import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
// import Loader from "../components/Loader";
import AuthService from "../helper/AuthService";
import "./Login.css";
import {
  emailRegex,
  formValid,
  userConstants,
} from "../constants/formValidation";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      loader: false,
      password: null,
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
      new AuthService().login(email, password).then(
        () => {
          NotificationManager.success(userConstants.LOGIN_SUCCESS);
          window.location.replace("/");
        },
        (error) => {
          NotificationManager.error(userConstants.LOGIN_FAILURE);
          window.location.replace("/confirmcode");
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
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  render() {
    const { formErrors } = this.state;
    const logged = localStorage.getItem("username");
    if (logged !== null) {
      return <Redirect to="/"></Redirect>;
    }
    return (
      <div className="container">
        <Form className="form-login" onSubmit={this.handleSubmit} noValidate>
          {/* <Loader loader={this.state.loader}></Loader> */}
          <h1>Login </h1>
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
            Login
          </Button>
          <h1 className="form-text">
            Don't have an account? <Link to="/register">Resigter</Link>
          </h1>
        </Form>
        <NotificationContainer></NotificationContainer>
      </div>
    );
  }
}

export default Login;

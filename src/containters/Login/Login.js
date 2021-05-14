import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import {
  emailRegex,
  formValid,
  userConstants,
} from "../../constants/formValidation";
import AuthService from "../../services/AuthService";

import "./Login.css";

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
    this.setState({ loader: true });
    if (formValid(this.state)) {
      const email = this.state.email;
      const password = this.state.password;
      new AuthService().login(email, password).then(
        () => {
          NotificationManager.success(userConstants.LOGIN_SUCCESS);
          window.location.replace("/");
          this.setState({ loader: false });
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
          {this.state.loader === true ? (
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
            <Button variant="outline-dark" type="submit" className="btn-login">
              Login
            </Button>
          )}

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

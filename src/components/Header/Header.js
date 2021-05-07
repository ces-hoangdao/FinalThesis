import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import Fade from "react-reveal/Fade";

import AuthService from "../../services/AuthService";

import "./Header.css";

const Header = () => {
  const isLogin = localStorage.getItem("token");
  const logout = () => {
    new AuthService().logout();
    localStorage.clear();
    window.location.replace("/");
    ;
  };

  const currentUser = localStorage.getItem("username");

  return (
    <>
    <header className="Header">
      <Navbar bg="dark" variant="dark" expand="lg" >
        <Container>
          <Fade left>
            <NavLink to="/">
              <Navbar.Brand>Master Travel</Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </Fade>

          <Fade right>
            <Navbar.Collapse
              className="collapse navbar-collapse"
              id="navbarColor03"
            >
              <Nav className="ml-auto">
                <Link to="/" className="nav-link">
                  Home{" "}
                </Link>
                <Link to="/listhouse" className="nav-link">
                  {" "}
                  Homestay{" "}
                </Link>
                <Link to="/about" className="nav-link">
                  About Us{" "}
                </Link>
                {!isLogin ? (
                  <Nav>
                    <Link to="/login" className="nav-link">
                      Login{" "}
                    </Link>
                  </Nav>
                ) : (
                  <NavDropdown title={currentUser} id="username">
                    <NavDropdown.Item>
                      <Link to="/editprofile">Profile</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to="/hostmanage">Host Management</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to="/bookinghistory">Booking History</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => logout()}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Fade>
        </Container>
      </Navbar>
    </header>
    <div className="HeaderContent"/>
    </>
  );
};
export default Header;
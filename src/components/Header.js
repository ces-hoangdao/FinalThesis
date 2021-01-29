import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import authService from "../helper/authService";

const Header = () => {
  var isLogin = localStorage.getItem("user");
  const logout = (e) => {
    authService.logout();
  };
  var currentUser = localStorage.getItem("userName");
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <NavLink to="/">
            <Navbar.Brand>Master Travel</Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            className="collapse navbar-collapse"
            id="navbarColor03"
          >
            <Nav className="ml-auto">
              <Nav.Link to="/">Home</Nav.Link>
              <Nav.Link href="#">Homestay</Nav.Link>
              <Nav.Link href="#">About Us</Nav.Link>
              {!isLogin ? (
                <Nav>
                    <Link to="/login" className = "nav-link">Login </Link>
                    <Link to="/register" className="nav-link">Register</Link>
                </Nav>
              ) : (
                <NavDropdown title={currentUser} id="username">
                  <NavDropdown.Item>
                    <Link to="#">Profile</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="#">Booking History</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              )}

              {/* {userInfo ? (
                
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )} */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;

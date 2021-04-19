import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import AuthService from "../../services/AuthService";
import AdminImg from "../../assets/admin.svg";

function AdminHeader() {
  const logout = () => {
    new AuthService().logout().then(() => {
      localStorage.clear();
      window.location.replace("/");
    });
  };
  const currentUser = localStorage.getItem("username");
  return (
    <div className="">
      <Navbar bg="light" variant="light" expand="lg">
        <Nav className="ml-auto">
          <Navbar.Brand href="#home">
            <img
              src={AdminImg}
              width="30"
              height="32"
              className="d-inline-block align-top"
              alt=" logo"
            />
          </Navbar.Brand>
          <NavDropdown title={currentUser} id="username">
            <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
    </div>
  );
}

export default AdminHeader;

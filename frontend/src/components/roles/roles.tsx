import React from "react";
import Nav from "react-bootstrap/Nav";
import { NavLink, Outlet } from "react-router-dom";
import "./roles.scss";

const Roles = () => {
  return (
    <div className="roles-container container-fluid">
      <div className="tab-nav-container">
        <Nav justify variant="tabs">
          <Nav.Item>
            <NavLink className="nav-link" to="/roles/display">
              Role list
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" to="/roles/adding">
              Add new roles
            </NavLink>
          </Nav.Item>
        </Nav>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Roles;

import React from "react";
import Nav from "react-bootstrap/Nav";
import { NavLink, Outlet } from "react-router-dom";

const Roles = () => {
  return (
    <div className="roles-container container-fluid container-md">
      <Outlet />
    </div>
  );
};

export default Roles;

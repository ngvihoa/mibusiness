import { Nav } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

const Users = () => {
  return (
    <>
      <div className="manage-users-container container-fluid container-md">
        <Outlet />
      </div>
    </>
  );
};

export default Users;

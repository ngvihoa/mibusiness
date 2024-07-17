import { Nav } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

const Users = () => {
  return (
    <>
      <div className="manage-users-container container-fluid container-md">
        <div className="tab-nav-container">
          <Nav justify variant="tabs">
            <Nav.Item>
              <NavLink className="nav-link" to="/users/list">
                User list
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className="nav-link" to="/users/group">
                Group list
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className="nav-link" to="/users/group-adding">
                Add groups
              </NavLink>
            </Nav.Item>
          </Nav>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Users;

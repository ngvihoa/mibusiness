import { Link, NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "stores/store";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import useAuth from "hooks/auth.hook";
import { matchPath } from "react-router-dom";

const NavigationBar = () => {
  const { handleLogOut } = useAuth();
  const { isAuth, username } = useAppSelector((state) => state.auth.value);
  const location = useLocation();

  return (
    <>
      {(isAuth || location.pathname === "/") && (
        <div className="navigation-header">
          <Navbar expand="lg" className="navigation-bar">
            <div className="navigation-container container-fluid px-4">
              <Navbar.Brand href="/" className="navigation-brand">
                MiBusiness
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavLink to="/" className="nav-link">
                    Home
                  </NavLink>
                  <div
                    className={`nav-link ${
                      matchPath("/users/*", location.pathname) ? "active" : ""
                    }`}
                  >
                    <NavDropdown title="Users" id="basic-nav-dropdown">
                      <NavDropdown.Item>
                        <NavLink to="/users/list">User list</NavLink>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <NavLink to="/users/group">Group list</NavLink>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <NavLink to="/users/group/adding">Add groups</NavLink>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                  <div
                    className={`nav-link ${
                      matchPath("/roles/*", location.pathname) ? "active" : ""
                    }`}
                  >
                    <NavDropdown title="Roles" id="basic-nav-dropdown">
                      <NavDropdown.Item>
                        <NavLink to="/roles/list">Role list</NavLink>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <NavLink to="/roles/adding">Add roles</NavLink>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <NavLink to="/roles/assign">Assign roles</NavLink>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                  <div
                    className={`nav-link ${
                      matchPath("/projects/*", location.pathname)
                        ? "active"
                        : ""
                    }`}
                  >
                    <NavDropdown title="Projects" id="basic-nav-dropdown">
                      <NavDropdown.Item>
                        <NavLink to="/projects/list">Project list</NavLink>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <NavLink to="/projects/adding">Add projects</NavLink>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                  <NavLink to="/about" className="nav-link">
                    About
                  </NavLink>
                </Nav>
                <Nav className="ms-auto nav-right">
                  {isAuth && (
                    <>
                      <Nav.Item className="welcome-text nav-link">
                        Welcome {username}!
                      </Nav.Item>
                      <NavDropdown title="Setting" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">
                          Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                          Change password
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={handleLogOut}>
                          Log out
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  )}
                  {!isAuth && (
                    <Link to="/login" className="nav-link">
                      Log in
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </div>
          </Navbar>
        </div>
      )}
    </>
  );
};

export default NavigationBar;

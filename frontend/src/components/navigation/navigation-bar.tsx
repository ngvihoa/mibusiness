import { Link, NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "src/redux/store";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./navigation-bar.scss";
import useAuth from "src/hooks/auth.hook";

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
                  <NavLink to="/users" className="nav-link">
                    Users
                  </NavLink>
                  <NavLink to="/roles" className="nav-link">
                    Roles
                  </NavLink>
                  <NavLink to="/projects" className="nav-link">
                    Projects
                  </NavLink>
                  <NavLink to="/about" className="nav-link">
                    About
                  </NavLink>
                </Nav>
                <Nav className="ms-auto">
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

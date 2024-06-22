import "./navigation-bar.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "src/redux/store";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavigationBar = () => {
  const { isAuth } = useAppSelector((state) => state.auth.value);
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
                  <NavLink to="/projects" className="nav-link">
                    Projects
                  </NavLink>
                  <NavLink to="/about" className="nav-link">
                    About
                  </NavLink>
                </Nav>
                <Nav className="ms-auto">
                  <Nav.Item className="welcome-text nav-link">Welcome</Nav.Item>
                  <NavDropdown title="Menu" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Change password
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Log out
                    </NavDropdown.Item>
                  </NavDropdown>
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

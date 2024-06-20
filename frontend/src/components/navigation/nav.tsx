import { useEffect, useState } from "react";
import "./nav.scss";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "src/redux/store";

const NavBar = () => {
  const [show, setShow] = useState(false);
  const { isAuth } = useAppSelector((state) => state.auth.value);
  useEffect(() => {
    if (isAuth) {
      setShow(true);
    }
  }, [isAuth]);

  const handleLogout = () => {};

  return (
    <>
      {show && (
        <div className="nav-bar d-flex justify-content-between align-items-center">
          <div>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/login">Logout</NavLink>
          </div>
          {/* <a
            className="text-white px-3"
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
          >
            Logout
          </a> */}
        </div>
      )}
    </>
  );
};

export default NavBar;

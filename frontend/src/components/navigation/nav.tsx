import "./nav.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "src/redux/store";

const NavBar = () => {
  const { isAuth } = useAppSelector((state) => state.auth.value);
  const location = useLocation();

  return (
    <>
      {(isAuth || location.pathname === "/") && (
        <div className="nav-bar d-flex justify-content-between align-items-center">
          <div>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/projects">Projects</NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;

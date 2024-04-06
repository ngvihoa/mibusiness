import { useEffect, useState } from "react";
import "./nav.scss";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

const NavBar = () => {
  const [show, setShow] = useState(false);
  const { isAuth } = useAppSelector((state) => state.auth.value);
  useEffect(() => {
    if (isAuth) {
      setShow(true);
    }
  }, [isAuth]);

  return (
    <>
      {show && (
        <div className="nav-bar">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/news">News</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      )}
    </>
  );
};

export default NavBar;

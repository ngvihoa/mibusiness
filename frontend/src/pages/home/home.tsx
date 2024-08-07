import { NavLink } from "react-router-dom";
import FillButton from "components/button/fill-button";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to MiBusiness!</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste aut
        officiis id accusamus, pariatur architecto quasi?
      </p>
      <FillButton>
        <NavLink to="/about">Start now</NavLink>
      </FillButton>
      <div className="dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default Home;

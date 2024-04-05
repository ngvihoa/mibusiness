import { Link, useNavigate } from "react-router-dom";
import "./login.scss";

const Login = () => {
  let navigate = useNavigate();
  const handleToSignup = () => {
    navigate("/signup");
  };
  return (
    <div
      className="login-container vh-100 d-flex
    justify-content-center align-items-center"
    >
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div
            className="content-left col-12 col-md-6 col-lg-7 d-md-flex 
          justify-content-md-center align-items-md-center px-4"
          >
            <div className="w-100 h-100 rounded-4 p-md-4 d-none d-md-block">
              <h1 className="brand fw-bolder text-center text-md-start w-100">
                MiBusiness
              </h1>
              <p className="detail">
                Welcome to MiBusiness, login and manage your team project!
              </p>
            </div>
          </div>
          <div
            className="content-right col-12 d-flex flex-column gap-3
          rounded-4 shadow p-4 py-5 bg-white col-md-6 col-lg-5"
          >
            <h1 className="brand fw-bolder text-center text-primary w-100 d-md-none">
              MiBusiness
            </h1>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Email, username or your phone number..."
              className="form-control"
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password..."
              className="form-control"
            />
            <button className="btn btn-primary fw-medium fs-5">Log In</button>
            <span className="btn btn-link p-0 m-0 text-start text-decoration-none">
              Forgot your password?
            </span>
            <div className="hr"></div>
            <button
              className="btn btn-dark fw-medium fs-5"
              onClick={handleToSignup}
            >
              Create new account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

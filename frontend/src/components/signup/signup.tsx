import { Link, useNavigate } from "react-router-dom";
import "./signup.scss";

const Signup = () => {
  let navigate = useNavigate();
  const handleToSignup = () => {
    navigate("/login");
  };
  return (
    <div
      className="signup-container vh-100 d-flex
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
            <div className="form-group d-flex flex-column gap-3">
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                />
                <label htmlFor="email">Email address</label>
              </div>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="John Doe"
                />
                <label htmlFor="username">Username</label>
              </div>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  placeholder="0977272384"
                />
                <label htmlFor="phone">Phone number</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="confirm-password"
                  name="confirm-password"
                  placeholder="Confirm password"
                />
                <label htmlFor="password">Confirm password</label>
              </div>
            </div>
            <button className="btn btn-primary fw-medium fs-5">Sign Up</button>
            <span
              className="btn btn-link p-0 m-0 text-start text-decoration-none"
              onClick={handleToSignup}
            >
              Already have an account? Login.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

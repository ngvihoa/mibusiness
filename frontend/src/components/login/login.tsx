import { useState } from "react";
import { toast } from "react-toastify";
import { LoginFormProps, LoginFormStateProps, LoginType } from "src/lib/type";
import { logInUser } from "src/services/userService";
import axios from "axios";
import { handleError } from "src/lib/func";
import useAuth from "src/hooks/auth.hook";
import "./login.scss";

const initialLoginForm: LoginFormProps = {
  keyLogin: "",
  password: "",
};

const initialLoginFormState: LoginFormStateProps = {
  isValidKeyLogin: true,
  isValidPassword: true,
};

const Login = () => {
  const { handleLogIn, handleToSignup } = useAuth();
  const [formLogin, setFormLogin] = useState<LoginFormProps>(initialLoginForm);
  const [formState, setFormState] = useState<LoginFormStateProps>(
    initialLoginFormState
  );

  const handleFormChange = (e: any) => {
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value });
  };

  const isValidLoginForm = () => {
    setFormState(initialLoginFormState);
    if (!formLogin.keyLogin) {
      toast.error("Please enter your email or phone number!");
      setFormState({ ...formState, isValidKeyLogin: false });
      return false;
    }
    if (!formLogin.password) {
      toast.error("Please enter your password!");
      setFormState({ ...formState, isValidPassword: false });
      return false;
    }

    return true;
  };

  const onLogIn = async () => {
    if (isValidLoginForm()) {
      try {
        let data = await logInUser(formLogin);
        const authState: LoginType = {
          accessToken: data.DT.access_token,
          email: data.DT.email,
          username: data.DT.username,
        };
        handleLogIn(authState);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = handleError(error.response?.status || 500);
          if (status === 400) {
            const data = error.response?.data;
            if (data.DT) {
              toast.error(data.EM);
              setFormState((prev) => ({
                ...prev,
                ...data.DT,
              }));
            }
          }
        }
      }
    }
  };

  const handleEnter = (e: any) => {
    // console.log("check event", e);
    if (e.key === "Enter") {
      onLogIn();
    }
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
              name="keyLogin"
              id="keyLogin"
              value={formLogin.keyLogin}
              onChange={(e) => handleFormChange(e)}
              onKeyDown={(e) => handleEnter(e)}
              placeholder="Email or your phone number..."
              className={`form-control ${
                !formState.isValidKeyLogin ? "is-invalid" : ""
              }`}
            />
            <input
              type="password"
              name="password"
              id="password"
              value={formLogin.password}
              onChange={(e) => handleFormChange(e)}
              onKeyDown={(e) => handleEnter(e)}
              placeholder="Enter your password..."
              className={`form-control ${
                !formState.isValidPassword ? "is-invalid" : ""
              }`}
            />
            <button
              className="btn btn-primary fw-medium fs-5"
              onClick={onLogIn}
            >
              Log In
            </button>
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

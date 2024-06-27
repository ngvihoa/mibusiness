import { useState } from "react";
import { toast } from "react-toastify";
import { LoginFormProps, LoginFormStateProps, LoginType } from "src/lib/type";
import { logInUser } from "src/services/userService";
import axios from "axios";
import { handleError } from "src/lib/func";
import useAuth from "src/hooks/auth.hook";
import FillButton from "../button/fill-button";
import LineButton from "../button/line-button";
import AuthLayout from "./auth-layout";
import "./auth.scss";

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
    <AuthLayout>
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
      <FillButton
        variant="primary"
        className="fw-medium fs-5"
        onClickFunction={onLogIn}
      >
        Log In
      </FillButton>
      <span className="btn p-0 m-0 text-start btn-link text-decoration-none">
        Forgot your password?
      </span>
      <div className="hr"></div>
      <LineButton
        variant="primary"
        className="fw-medium fs-5"
        onClickFunction={handleToSignup}
      >
        Create new account
      </LineButton>
    </AuthLayout>
  );
};

export default Login;

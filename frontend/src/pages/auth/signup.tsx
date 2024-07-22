import { useState } from "react";
import { toast } from "react-toastify";
import { handleError, validateEmail, validatePhone } from "lib/func";
import { SignUpFormProps, SignUpFormStateProps } from "lib/type";
import { signUpNewUser } from "services/userService";
import axios from "axios";
import useAuth from "hooks/auth.hook";
import FillButton from "components/button/fill-button";
import AuthLayout from "./auth-layout";

const initialForm = {
  email: "",
  username: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const initialFormState = {
  isValidEmail: true,
  isValidUsername: true,
  isValidPhone: true,
  isValidPassword: true,
  isValidConfirmPassword: true,
};

const Signup = () => {
  const { handleToLogin } = useAuth();
  const [form, setForm] = useState<SignUpFormProps>(initialForm);
  const [formState, setFormState] =
    useState<SignUpFormStateProps>(initialFormState);

  const handleFormChange = (e: any) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isValidateInput = () => {
    setFormState(initialFormState);

    if (!form.email) {
      toast.error("Email is required!");
      setFormState({
        ...initialFormState,
        isValidEmail: false,
      });
      return false;
    }
    if (!validateEmail(form.email)) {
      toast.error("Invalid email adddress");
      setFormState({
        ...initialFormState,
        isValidEmail: false,
      });
      return false;
    }

    if (!form.username) {
      toast.error("Username is required!");
      setFormState({
        ...initialFormState,
        isValidUsername: false,
      });
      return false;
    }

    if (!form.phone) {
      toast.error("Phone number is required!");
      setFormState({
        ...initialFormState,
        isValidPhone: false,
      });
      return false;
    }

    if (!validatePhone(form.phone)) {
      toast.warning("Phone number should have 10 digits");
      setFormState({
        ...initialFormState,
        isValidPhone: false,
      });
      return false;
    }

    if (!form.password) {
      toast.error("Password is required!");
      setFormState({
        ...initialFormState,
        isValidPhone: false,
      });
      return false;
    }

    if (form.password.length < 8) {
      toast.warning("Please enter at least 8 characters for the password.");
      setFormState({
        ...initialFormState,
        isValidPassword: false,
      });
      return false;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Your password is not the same!");
      setFormState({
        ...initialFormState,
        isValidConfirmPassword: false,
      });
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    try {
      let isValid = isValidateInput();
      if (isValid) {
        const data = await signUpNewUser(form);
        toast.success(data.message);
        handleToLogin();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = handleError(error.response?.status || 500);
        if (status === 400) {
          const data = error.response?.data;
          toast.error(data.message);
          if (data.data)
            setFormState((prev) => ({
              ...prev,
              ...data.data,
            }));
        }
      }
    }
  };

  return (
    <AuthLayout>
      <div className="form-group d-flex flex-column gap-3">
        <div className="form-floating">
          <input
            type="email"
            className={`form-control ${
              !formState.isValidEmail ? "is-invalid" : ""
            }`}
            id="email"
            name="email"
            placeholder="name@example.com"
            value={form.email}
            onChange={(e) => handleFormChange(e)}
          />
          <label htmlFor="email">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className={`form-control ${
              !formState.isValidUsername ? "is-invalid" : ""
            }`}
            id="username"
            name="username"
            placeholder="John Doe"
            value={form.username}
            onChange={(e) => handleFormChange(e)}
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className={`form-control ${
              !formState.isValidPhone ? "is-invalid" : ""
            }`}
            id="phone"
            name="phone"
            placeholder="0977272384"
            value={form.phone}
            onChange={(e) => handleFormChange(e)}
          />
          <label htmlFor="phone">Phone number</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className={`form-control ${
              !formState.isValidPassword ? "is-invalid" : ""
            }`}
            id="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => handleFormChange(e)}
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className={`form-control ${
              !formState.isValidConfirmPassword ? "is-invalid" : ""
            }`}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={(e) => handleFormChange(e)}
          />
          <label htmlFor="password">Confirm password</label>
        </div>
      </div>
      <FillButton className="fw-medium fs-5" onClickFunction={handleSignUp}>
        Sign Up
      </FillButton>
      <span
        className="btn p-0 m-0 text-start text-link"
        onClick={handleToLogin}
      >
        Already have an account? Login.
      </span>
    </AuthLayout>
  );
};

export default Signup;

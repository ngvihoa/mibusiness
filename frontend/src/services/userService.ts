import axios from "axios";
import { LoginFormProps, SignUpFormProps } from "../lib/type";

const signUpNewUser = (form: SignUpFormProps) => {
  return axios.post("http://localhost:8888/api/v1/signup", {
    ...form,
  });
};

const logInUser = (form: LoginFormProps) => {
  return axios.post("http://localhost:8888/api/v1/login", {
    ...form,
  });
};

export { signUpNewUser, logInUser };

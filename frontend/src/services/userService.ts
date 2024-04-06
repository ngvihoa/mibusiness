import axios from "axios";
import { FormProps } from "../lib/type";

const signUpNewUser = (form: FormProps) => {
  return axios.post("http://localhost:8888/api/v1/signup", {
    ...form,
  });
};

export { signUpNewUser };

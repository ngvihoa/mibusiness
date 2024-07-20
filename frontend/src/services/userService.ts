// import axios from "axios";
import { LoginFormProps, SignUpFormProps, createUserFormProps } from "lib/type";
import axios from "config/axios.config";

const signUpNewUser = (form: SignUpFormProps) => {
  return axios.post("/signup", {
    ...form,
  });
};

const logInUser = (form: LoginFormProps) => {
  return axios.post("/login", {
    ...form,
  });
};

const fetchAllUsers = (page: number, limit: number) => {
  return axios.get(`/user?page=${page}&limit=${limit}`);
};

const deleteUser = (id: number) => {
  return axios.delete(`/user`, {
    data: {
      id: id,
    },
  });
};

const createNewUser = (user: createUserFormProps) => {
  return axios.post(`/user`, {
    ...user,
  });
};

const updateUser = (id: number, user: createUserFormProps) => {
  return axios.put(`/user`, {
    id,
    ...user,
  });
};

const logOutUser = () => {
  return axios.post(`/logout`);
};

export {
  signUpNewUser,
  logInUser,
  fetchAllUsers,
  deleteUser,
  createNewUser,
  updateUser,
  logOutUser,
};

import axios from "axios";
import {
  LoginFormProps,
  SignUpFormProps,
  createUserFormProps,
} from "../lib/type";

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

const fetchAllUsers = (page: number, limit: number) => {
  return axios.get(
    `http://localhost:8888/api/v1/user/read?page=${page}&limit=${limit}`
  );
};

const deleteUser = (id: number) => {
  return axios.delete(`http://localhost:8888/api/v1/user/delete`, {
    data: {
      id: id,
    },
  });
};

const fetchGroups = () => {
  return axios.get(`http://localhost:8888/api/v1/group/read`);
};

const createNewUser = (user: createUserFormProps) => {
  return axios.post(`http://localhost:8888/api/v1/user/create`, {
    ...user,
  });
};

const updateUser = (id: number, user: createUserFormProps) => {
  return axios.put(`http://localhost:8888/api/v1/user/update`, {
    id,
    ...user,
  });
};

export {
  signUpNewUser,
  logInUser,
  fetchAllUsers,
  deleteUser,
  fetchGroups,
  createNewUser,
  updateUser,
};

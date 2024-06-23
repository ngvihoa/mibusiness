import { RoleType } from "src/lib/type";
import axios from "src/config/axios.config";

const createRoles = (roles: RoleType[]) => {
  return axios.post("/role/create", roles);
};

export { createRoles };

import { GroupRoleType, RoleDBType, RoleType } from "src/lib/type";
import axios from "src/config/axios.config";

const createRoles = (roles: RoleType[]) => {
  return axios.post("/role/create", roles);
};

const deleteRole = (role: RoleDBType) => {
  return axios.delete("/role/delete", {
    data: role,
  });
};

const fetchAllRoles = (page?: number, limit?: number) => {
  return axios.get(
    `/role/read${page && limit ? `?page=${page}&limit=${limit}` : ""}`
  );
};

const fetchRolesByGroup = (groupId: number) => {
  return axios.get(`/role/by-group/${groupId}`);
};

const assignRoles = (groupId: number, groupRoles: GroupRoleType[]) => {
  return axios.post("/role/assign", {
    groupId: groupId,
    groupRoles: groupRoles,
  });
};

export {
  createRoles,
  deleteRole,
  fetchAllRoles,
  fetchRolesByGroup,
  assignRoles,
};

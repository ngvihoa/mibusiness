import { GroupRoleType, RoleDBType, RoleType } from "lib/type";
import axios from "config/axios.config";

const createRoles = (roles: RoleType[]) => {
  return axios.post("/role", roles);
};

const deleteRole = (role: RoleDBType) => {
  return axios.delete("/role", {
    data: role,
  });
};

const fetchAllRoles = (page?: number, limit?: number) => {
  return axios.get(
    `/role${page && limit ? `?page=${page}&limit=${limit}` : ""}`
  );
};

const fetchRolesByGroup = (groupId: number) => {
  return axios.get(`/role/byGroup/${groupId}`);
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

// import axios from "axios";
import { GroupDBGet, GroupPostType } from "lib/type";
import axios from "config/axios.config";

const fetchGroups = () => {
  return axios.get(`/group/read`);
};

const createGroups = (groups: GroupPostType[]) => {
  return axios.post("/group/create", groups);
};

const deleteGroup = (group: GroupDBGet) => {
  return axios.delete("/group/delete", {
    data: group,
  });
};
export { fetchGroups, createGroups, deleteGroup };

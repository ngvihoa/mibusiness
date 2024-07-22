// import axios from "axios";
import { GroupDBGet, GroupPostType } from "lib/type";
import axios from "config/axios.config";

const fetchGroups = () => {
  return axios.get(`/group`);
};

const createGroups = (groups: GroupPostType[]) => {
  return axios.post("/group", groups);
};

const updateGroup = (id: number, group: GroupPostType) => {
  return axios.put("/group", {
    id,
    ...group,
  });
};

const deleteGroup = (group: GroupDBGet) => {
  return axios.delete("/group", {
    data: group,
  });
};
export { fetchGroups, createGroups, updateGroup, deleteGroup };

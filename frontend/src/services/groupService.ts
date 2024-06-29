// import axios from "axios";
import { GroupPostType } from "src/lib/type";
import axios from "src/config/axios.config";

const fetchGroups = () => {
  return axios.get(`/group/read`);
};

const createGroups = (groups: GroupPostType[]) => {};

export { fetchGroups, createGroups };

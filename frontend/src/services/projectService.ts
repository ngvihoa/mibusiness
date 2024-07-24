// import axios from "axios";
import {
  ProjectDBGet,
  ProjectPostType,
} from "lib/interfaces/project.interface";
import axios from "config/axios.config";

const getProjects = (page?: number, limit?: number) => {
  return axios.get(
    `/project${page && limit && `?page=${page}&limit=${limit}`}`
  );
};

const createProject = (project: ProjectPostType) => {
  return axios.post("/project", project);
};

const updateProject = (id: number, project: ProjectPostType) => {
  return axios.put("/project", {
    id,
    ...project,
  });
};

const deleteProject = (project: ProjectDBGet) => {
  return axios.delete("/project", {
    data: project,
  });
};
export { getProjects, createProject, updateProject, deleteProject };

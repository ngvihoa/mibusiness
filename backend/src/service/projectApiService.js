import db from "../models/index.js";

const createProject = async (project) => {
  try {
  } catch (error) {
    console.log(error);
    return {
      message: "Server error!",
      status: 500,
      data: null,
    };
  }
};

const getProjects = async () => {
  try {
  } catch (error) {
    console.log(error);
    return {
      message: "Server error!",
      status: 500,
      data: null,
    };
  }
};

const deleteProject = async (id) => {
  try {
    // await db.Group.destroy({
    //   where: { id: id },
    // });
    return {
      message: "",
      status: 200,
      data: null,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Server error!",
      status: 500,
      data: null,
    };
  }
};

export default {
  createProject,
  getProjects,
  deleteProject,
};

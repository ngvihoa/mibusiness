import db from "../models/index.js";

const createProject = async (project) => {
  try {
    const checkSameNameProject = await db.Project.findOne({
      where: { name: project.name },
    });
    if (checkSameNameProject) {
      return {
        message: `Project ${project.name} has already existed!`,
        status: 400,
        data: project,
      };
    }
    await db.Project.create(project);
    return {
      message: `Project ${project.name} is created!`,
      status: 200,
      data: project,
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

const getAllProjects = async () => {
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

const getProjectPaginated = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.Project.findAndCountAll({
      attributes: [
        "id",
        "name",
        "description",
        "startDate",
        "endDate",
        "customerId",
      ],
      include: {
        model: db.User,
        attributes: ["id", "username"],
      },
      limit: +limit,
      offset: +offset,
      order: [["startDate", "DESC"]],
    });
    const totalPages = Math.ceil(count / limit);
    return {
      message: "Found users from " + offset + " to " + (offset + limit),
      status: 200,
      data: { totalRows: count, totalPages: totalPages, projects: rows },
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
  getAllProjects,
  getProjectPaginated,
  deleteProject,
};

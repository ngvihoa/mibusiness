import db from "../models/index.js";

const createProject = async (project) => {
  try {
    // const oldGroups = await db.Group.findAll({
    //   attributes: ["name", "description"],
    //   raw: true,
    // });
    // const newGroups = groups.filter(
    //   (group) => !oldGroups.some((oldGroup) => oldGroup.name === group.name)
    // );
    // if (newGroups.length === 0) {
    //   return {
    //     EM: "Nothing to create!",
    //     EC: -1,
    //     DT: "",
    //   };
    // }
    // let data = await db.Group.bulkCreate(newGroups);
    // return {
    //   EM: `Create successfully ${newGroups.length} group(s)!`,
    //   EC: 0,
    //   DT: data,
    // };
  } catch (error) {
    console.log(error);
    return {
      EM: "Error from service!",
      EC: -2,
      DT: "",
    };
  }
};

const getProjects = async () => {
  try {
    // let data = await db.Group.findAll({
    //   order: [["name", "ASC"]],
    // });
    // return {
    //   EM: "Get group success!",
    //   EC: 0,
    //   DT: data,
    // };
  } catch (error) {
    console.log(error);
    return {
      EM: "Error from service!",
      EC: -2,
      DT: [],
    };
  }
};

const deleteProject = async (id) => {
  try {
    // await db.Group.destroy({
    //   where: { id: id },
    // });
    return {
      EM: "",
      EC: 0,
      DT: "",
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Error from service!",
      EC: -2,
      DT: [],
    };
  }
};

export default {
  createProject,
  getProjects,
  deleteProject,
};

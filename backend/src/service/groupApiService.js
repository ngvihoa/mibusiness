import db from "../models/index.js";

const getGroups = async () => {
  try {
    let data = await db.Group.findAll({
      order: [["name", "ASC"]],
    });
    return {
      EM: "Get group success!",
      EC: 0,
      DT: data,
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
  getGroups,
};

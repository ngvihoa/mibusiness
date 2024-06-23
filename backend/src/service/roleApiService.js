import db from "../models/index.js";

const createNewRoles = async (roles) => {
  try {
    const oldRole = await db.Role.findAll({
      attributes: ["url", "description"],
      raw: true,
    });
    const newRoles = roles.filter(
      (role) => !oldRole.some((oldRole) => oldRole.url === role.url)
    );
    console.log("create roles:", newRoles);
    if (newRoles.length === 0) {
      return {
        EM: "Nothing to create!",
        EC: -1,
        DT: "",
      };
    }
    let data = await db.Role.bulkCreate(newRoles);
    return {
      EM: `Create successfully ${newRoles.length} role(s)!`,
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Error from service!",
      EC: -2,
      DT: "",
    };
  }
};

export default {
  createNewRoles,
};

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

const getAllRoles = async () => {
  try {
    let data = await db.Role.findAll();
    return {
      EM: "Get all roles successfully",
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

const getRolePaginated = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.Role.findAndCountAll({
      attributes: ["id", "url", "description"],
      limit: +limit,
      offset: +offset,
      order: [["id", "DESC"]],
    });
    const totalPages = Math.ceil(count / limit);
    return {
      EM: "Get roles successfully!",
      EC: 0,
      DT: { totalRows: count, totalPages: totalPages, roles: rows },
    };
  } catch (e) {
    return {
      EM: "Error from server!",
      EC: -2,
      DT: "",
    };
  }
};

const deleteRole = async (id) => {
  try {
    await db.Role.destroy({
      where: { id: id },
    });
    return {
      EM: "",
      EC: 0,
      DT: "",
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Error from server!",
      EC: -2,
      DT: "",
    };
  }
};

export default {
  createNewRoles,
  getAllRoles,
  getRolePaginated,
  deleteRole,
};

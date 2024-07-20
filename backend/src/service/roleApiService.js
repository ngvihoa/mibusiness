import db from "../models/index.js";

const createNewRoles = async (roles) => {
  try {
    const oldRole = await db.Role.findAll({
      attributes: ["method", "url", "description"],
      raw: true,
    });
    const newRoles = roles.filter(
      (role) =>
        !oldRole.some(
          (oldRole) =>
            oldRole.url === role.url && oldRole.method === role.method
        )
    );
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
      attributes: ["id", "method", "url", "description"],
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

const getRolesByGroup = async (groupId) => {
  try {
    let role = [];
    if (groupId && !isNaN(groupId)) {
      const data = await db.Group.findOne({
        where: { id: groupId },
        attributes: ["id", "name", "description"],
        include: [
          {
            model: db.Role,
            attributes: ["id", "method", "url", "description"],
            through: { attributes: [] },
          },
        ],
      });
      role = data.Roles;
    }
    return {
      EM: "",
      EC: 0,
      DT: role,
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

const assignRolesToGroup = async (groupId, groupRoles) => {
  try {
    // console.log("checking input", groupId, groupRoles);
    if (groupId && !isNaN(groupId) && groupRoles) {
      await db.Group_Role.destroy({
        where: { groupId: +groupId },
      });
      let data = await db.Group_Role.bulkCreate(groupRoles);
      return {
        EM: "",
        EC: 0,
        DT: data,
      };
    } else throw new Error();
  } catch (error) {
    console.log(error);
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
  getRolesByGroup,
  assignRolesToGroup,
};

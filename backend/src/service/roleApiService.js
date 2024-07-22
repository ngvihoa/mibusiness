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
        message: "Nothing to create!",
        status: 400,
        data: null,
      };
    }
    let data = await db.Role.bulkCreate(newRoles);
    return {
      message: `Create successfully ${newRoles.length} role(s)!`,
      status: 200,
      data: data,
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

const getAllRoles = async () => {
  try {
    let data = await db.Role.findAll();
    return {
      message: "Get all roles successfully",
      status: 200,
      data: data,
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
      message: "Get roles successfully!",
      status: 200,
      data: { totalRows: count, totalPages: totalPages, roles: rows },
    };
  } catch (e) {
    return {
      message: "Server error!",
      status: 500,
      data: null,
    };
  }
};

const deleteRole = async (id) => {
  try {
    await db.Role.destroy({
      where: { id: id },
    });
    return {
      message: "",
      status: 200,
      data: null,
    };
  } catch (e) {
    console.log(e);
    return {
      message: "Server error!",
      status: 500,
      data: null,
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
      message: "",
      status: 200,
      data: role,
    };
  } catch (e) {
    console.log(e);
    return {
      message: "Server error!",
      status: 500,
      data: null,
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
        message: "Assign successfully!",
        status: 200,
        data: data,
      };
    } else throw new Error();
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
  createNewRoles,
  getAllRoles,
  getRolePaginated,
  deleteRole,
  getRolesByGroup,
  assignRolesToGroup,
};

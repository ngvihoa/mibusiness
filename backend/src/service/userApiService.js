import db from "../models/index.js";
import helperService from "./helperService.js";

const getAllUsers = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex"],
      include: {
        model: db.Group,
        attributes: ["name", "description"],
      },
    });
    if (users) {
      return {
        EM: "Read data success",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "Read data success",
        EC: 0,
        DT: [],
      };
    }
  } catch (e) {
    return {
      EM: "Error from server - service",
      EC: -1,
      DT: "",
    };
  }
};

const getUserPaginated = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      attributes: ["id", "username", "email", "phone", "sex", "address"],
      include: {
        model: db.Group,
        attributes: ["id", "name", "description"],
      },
      limit: +limit,
      offset: +offset,
      order: [["id", "DESC"]],
    });
    const totalPages = Math.ceil(count / limit);
    return {
      EM: "Found users from " + offset + " to " + (offset + limit),
      EC: 0,
      DT: { totalRows: count, totalPages: totalPages, users: rows },
    };
  } catch (e) {
    return {
      EM: "Error from server - service",
      EC: -1,
      DT: "",
    };
  }
};

const createNewUser = async (user) => {
  try {
    // check email, phone unique
    if (await helperService.checkEmailExist(user.email)) {
      return {
        EM: "The email has already existed.",
        EC: "1",
        DT: {
          email: false,
        },
      };
    }

    if (await helperService.checkPhoneExist(user.phone)) {
      return {
        EM: "The phone number has already existed.",
        EC: "1",
        DT: {
          phone: false,
        },
      };
    }

    // hash password
    let hashPass = helperService.hashPassword(user.password);

    // create user
    await db.User.create({
      ...user,
      password: hashPass,
    });
    return {
      EM: "Create new user ok!",
      EC: 0,
      DT: user,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Error from server - service",
      EC: -1,
      DT: "",
    };
  }
};

const updateUser = async (data) => {
  try {
    console.log("finding", data.id);
    let user = await db.User.findOne({
      where: { id: data.id },
    });

    if (user) {
      await user.update({
        username: data.username,
        address: data.address,
        sex: data.sex,
        groupId: data.groupId,
      });
      return {
        EM: "Update user successfully",
        EC: 0,
        DT: "",
      };
    } else {
      return {
        EM: "Updating user is not exist",
        EC: -1,
        DT: "",
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "Error from server - service",
      EC: -1,
      DT: "",
    };
  }
};

const deleteUser = async (id) => {
  try {
    await db.User.destroy({
      where: { id: id },
    });
    return {
      EM: "Delete successfully user " + id,
      EC: 0,
      DT: "",
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Error from server - service",
      EC: -1,
      DT: "",
    };
  }
};

export default {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  getUserPaginated,
};

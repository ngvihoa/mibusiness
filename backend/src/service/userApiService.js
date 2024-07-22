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
    return {
      message: "Read data success",
      status: 200,
      data: users ?? [],
    };
  } catch (e) {
    return {
      message: "Server error!",
      status: 500,
      data: null,
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
      message: "Found users from " + offset + " to " + (offset + limit),
      status: 200,
      data: { totalRows: count, totalPages: totalPages, users: rows },
    };
  } catch (e) {
    return {
      message: "Server error!",
      status: 500,
      data: null,
    };
  }
};

const createNewUser = async (user) => {
  try {
    // check email, phone unique
    if (await helperService.checkEmailExist(user.email)) {
      return {
        message: "The email has already existed.",
        status: 400,
        data: {
          email: false,
        },
      };
    }

    if (await helperService.checkPhoneExist(user.phone)) {
      return {
        message: "The phone number has already existed.",
        status: 400,
        data: {
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
      message: "New user is created!",
      status: 200,
      data: user,
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

const updateUser = async (data) => {
  try {
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
        message: "Update user successfully",
        status: 200,
        data: null,
      };
    } else {
      return {
        message: "Updating user is not exist",
        status: 400,
        data: null,
      };
    }
  } catch (e) {
    console.log(e);
    return {
      message: "Server error!",
      status: 500,
      data: null,
    };
  }
};

const deleteUser = async (id) => {
  try {
    await db.User.destroy({
      where: { id: id },
    });
    return {
      message: "Delete successfully user " + id,
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

const getUsersByGroup = async (groupId) => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "username"],
      where: { groupId: groupId },
    });
    return {
      message: "Read data success",
      status: 200,
      data: users ?? [],
    };
  } catch (e) {
    return {
      message: "Server error!",
      status: 500,
      data: null,
    };
  }
};

export default {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  getUserPaginated,
  getUsersByGroup,
};

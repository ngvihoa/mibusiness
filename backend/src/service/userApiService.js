import db from "../models";

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

const createNewUser = async (user) => {
  try {
    await db.User.create({
      ...user,
    });
  } catch (e) {
    return {
      EM: "Error from server - service",
      EC: -1,
      DT: "",
    };
  }
};

const updateUser = async (data) => {
  try {
    let user = await db.User.finOne({
      where: { id: data.id },
    });

    if (user) {
      user.save({});
    } else {
      return {
        EM: "Cannot find user",
        EC: -1,
        DT: "",
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

const deleteUser = async (id) => {
  try {
    await db.User.delete({
      where: { id: id },
    });
  } catch (e) {
    return {
      EM: "Error from server - service",
      EC: -1,
      DT: "",
    };
  }
};

export default { getAllUsers, createNewUser, updateUser, deleteUser };

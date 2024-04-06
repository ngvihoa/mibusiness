import bcrypt from "bcryptjs";
import db from "../models/index.js";

// setup bcrypt
const salt = bcrypt.genSaltSync(10);

const test_input = (input) => {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  input = input
    .trim()
    .replace(/\\/g, "")
    .replace(/[&<>"']/g, (m) => map[m]);
  return input;
};

function validateEmail(email) {
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,4}$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
}

function validatePassword(password) {
  return password.length >= 8;
}

const hashPassword = (userPassword) => {
  const hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const checkEmailExist = async (email) => {
  const user = await db.User.findOne({
    where: {
      email: email,
    },
  });

  if (user) return true;
  return false;
};

const checkPhoneExist = async (phone) => {
  const user = await db.User.findOne({
    where: {
      phone: phone,
    },
  });

  if (user) return true;
  return false;
};

const createNewUser = async (rawData) => {
  // check email, phone unique
  if (await checkEmailExist(rawData.email)) {
    return {
      EM: "The email has already existed.",
      EC: "1",
      DT: {
        isValidEmail: false,
      },
    };
  }
  if (await checkPhoneExist(rawData.phone)) {
    return {
      EM: "The phone number has already existed.",
      EC: "1",
      DT: {
        isValidPhone: false,
      },
    };
  }

  // hash password
  let hashPass = hashPassword(rawData.password);

  // create user
  try {
    await db.User.create({
      ...rawData,
      password: hashPass,
    });
    return {
      EM: "New user has been created successfully!",
      EC: "0",
      DT: "",
    };
  } catch (e) {
    return {
      EM: "Something wrong with service!",
      EC: "-2",
      DT: "",
    };
  }
};

const getUserList = async () => {
  // test association
  // let newUser = await db.User.findOne({
  //   where: { id: 1 },
  //   attributes: ["id", "email", "username"], // identify cols in query
  //   include: { model: db.Group, attributes: ["id", "name", "description"] }, // join
  //   raw: true,
  //   nest: true,
  // });
  // console.log(">>> check a user", newUser);
  // let roles = await db.Role.findAll({
  //   include: {
  //     model: db.Group,
  //     where: { id: newUser.Group.id },
  //   },
  //   raw: true,
  //   nest: true,
  // });
  // console.log(">>> check user role", roles);
  // let users = [];
  // try {
  //   users = await db.User.findAll();
  // } catch (e) {
  //   console.log(">>> check get uerlist:", e);
  // }
  // return users;
};

const deleteUser = async (userId) => {
  // try {
  //   await db.User.destroy({
  //     where: {
  //       id: userId,
  //     },
  //   });
  // } catch (e) {
  //   console.log(">>> check deleteUser :", e);
  // }
};

const getUserById = async (userId) => {
  // try {
  //   const user = await db.User.findOne({
  //     where: {
  //       id: userId,
  //     },
  //   });
  //   return user;
  // } catch (e) {
  //   console.log(">>> check edit user:", e);
  // }
};

const updateUserInfo = async (id, email, username) => {
  // try {
  //   await db.User.update(
  //     {
  //       email: email,
  //       username: username,
  //     },
  //     {
  //       where: {
  //         id: id,
  //       },
  //     }
  //   );
  // } catch (e) {
  //   console.log(">>> check update user:", e);
  // }
};

export default {
  test_input,
  validateEmail,
  validatePhone,
  validatePassword,
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfo,
};

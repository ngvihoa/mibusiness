// Get the client
import mysql from "mysql2/promise";
// get the promise implementation, we will use bluebird
import bluebird from "bluebird";
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

const hashPassword = (userPassword) => {
  const hashPassword = bcrypt.hashSync(userPassword, salt);
  // let check = bcrypt.compareSync(userPassword, hashPassword);
  return hashPassword;
};

const createNewUser = async (email, username, password) => {
  let hashPass = hashPassword(password);

  try {
    await db.User.create({
      username: username,
      email: email,
      password: hashPass,
    });
  } catch (e) {
    console.log(e);
  }
};

const getUserList = async () => {
  // test association
  let newUser = await db.User.findOne({
    where: { id: 1 },
    attributes: ["id", "email", "username"], // identify cols in query
    include: { model: db.Group, attributes: ["id", "name", "description"] }, // join
    raw: true,
    nest: true,
  });

  console.log(">>> check a user", newUser);

  let roles = await db.Role.findAll({
    include: {
      model: db.Group,
      where: { id: newUser.Group.id },
    },
    raw: true,
    nest: true,
  });

  console.log(">>> check user role", roles);

  let users = [];
  try {
    users = await db.User.findAll();
  } catch (e) {
    console.log(">>> check get uerlist:", e);
  }

  return users;
};

const deleteUser = async (userId) => {
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "decentral_app",
  //   Promise: bluebird,
  // });
  // try {
  //   const [rows, fields] = await connection.execute(
  //     "DELETE FROM user WHERE id=?",
  //     [id]
  //   );
  // } catch (e) {
  //   console.log(e);
  // }

  try {
    await db.User.destroy({
      where: {
        id: userId,
      },
    });
  } catch (e) {
    console.log(">>> check deleteUser :", e);
  }
};

const getUserById = async (userId) => {
  /*
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "decentral_app",
    Promise: bluebird,
  });
  try {
    const [rows, fields] = await connection.execute(
      "SELECT * FROM user WHERE id=?",
      [id]
    );
    return rows;
  } catch (e) {
    console.log(e);
  }
  */

  try {
    const user = await db.User.findOne({
      where: {
        id: userId,
      },
    });

    return user;
  } catch (e) {
    console.log(">>> check edit user:", e);
  }
};

const updateUserInfo = async (id, email, username) => {
  /*
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "decentral_app",
    Promise: bluebird,
  });
  try {
    const [rows, fields] = await connection.execute(
      "UPDATE user SET email=?, username=? WHERE id=?",
      [email, username, id]
    );
  } catch (e) {
    console.log(e);
  }
  */
  try {
    await db.User.update(
      {
        email: email,
        username: username,
      },
      {
        where: {
          id: id,
        },
      }
    );
  } catch (e) {
    console.log(">>> check update user:", e);
  }
};

export default {
  test_input,
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfo,
};

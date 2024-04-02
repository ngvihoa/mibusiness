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
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "decentral_app",
    Promise: bluebird,
  });
  try {
    const [rows, fields] = await connection.execute("SELECT * FROM user");
    return rows;
  } catch (e) {
    console.log(e);
  }
};

const deleteUser = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "decentral_app",
    Promise: bluebird,
  });
  try {
    const [rows, fields] = await connection.execute(
      "DELETE FROM user WHERE id=?",
      [id]
    );
  } catch (e) {
    console.log(e);
  }
};

const getUserById = async (id) => {
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
};

const updateUserInfo = async (id, email, username) => {
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
};

export default {
  test_input,
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfo,
};

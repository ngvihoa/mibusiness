// Get the client
import mysql from "mysql2/promise";
// get the promise implementation, we will use bluebird
import bluebird from "bluebird";
import bcrypt from "bcryptjs";

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

  console.log(hashPassword);

  let check = bcrypt.compareSync(userPassword, hashPassword);

  console.log(check);
  return hashPassword;
};

const createNewUser = async (email, username, password) => {
  let hashPass = hashPassword(password);
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "decentral_app",
    Promise: bluebird,
  });
  try {
    const [rows, fields] = await connection.execute(
      "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
      [email, username, hashPass]
    );
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
    const [rows, fields] = await connection.execute("SELECT * FROM users");
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
      "DELETE FROM users WHERE id=?",
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
      "SELECT * FROM users WHERE id=?",
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
      "UPDATE users SET email=?, username=? WHERE id=?",
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

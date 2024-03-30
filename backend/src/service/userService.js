// Get the client
import mysql from "mysql2/promise";
// get the promise implementation, we will use bluebird
import bluebird from "bluebird";
import bcrypt from "bcryptjs";

// create the connection, specify bluebird as Promise
const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "decentral_app",
  Promise: bluebird,
});

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

const createNewUser = (email, username, password) => {
  let hashPass = hashPassword(password);

  // A simple SELECT query
  connection.query(
    `INSERT INTO users (email, username, password) VALUES (?, ?, ?)`,
    [email, username, hashPass],
    function (err, results, fields) {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );
};

const getUserList = async () => {
  try {
    const [rows, fields] = await connection.execute("SELECT * FROM users");
    return rows;
  } catch (e) {
    console.log(e);
  }
};

export default {
  test_input,
  createNewUser,
  getUserList,
};

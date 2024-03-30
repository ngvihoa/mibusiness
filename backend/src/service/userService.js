// Get the client
import mysql from "mysql2";
import bcrypt from "bcryptjs";

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "decentral_app",
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

const getUserList = () => {
  let users = [];
  connection.query(`SELECT * FROM users`, function (err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  });
};

export default {
  test_input,
  createNewUser,
  getUserList,
};

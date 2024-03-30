// Get the client
import mysql from "mysql2";

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "decentral_app",
});

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

const handleHomePage = (req, res, next) => {
  return res.render("home.ejs");
};

const handleUserPage = (req, res, next) => {
  return res.render("user.ejs");
};

const handleCreateNewUser = (req, res, next) => {
  console.log(req.body);

  const email = test_input(req.body.email);
  const username = test_input(req.body.username);
  const password = test_input(req.body.password);

  // A simple SELECT query
  connection.query(
    `INSERT INTO users (email, username, password) VALUES (?, ?, ?)`,
    [email, username, password],
    function (err, results, fields) {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
      // console.log(err);
    }
  );

  // if (!email || !username || !password) {
  //   return res.status(400).json({ error: "RAWR! All fields are required" });
  // } else if (password.length < 6) {
  //   return res
  //     .status(400)
  //     .json({ error: "Woah there, that password is too short!" });
  // }
  return res.send("New user is adding...");
};

// export { handleHomePage, handleUserPage };
export default { handleHomePage, handleUserPage, handleCreateNewUser };

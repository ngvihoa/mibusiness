import userService from "../service/userService.js";

const handleHomePage = (req, res, next) => {
  return res.render("home.ejs");
};

const handleUserPage = async (req, res, next) => {
  const userList = await userService.getUserList();
  return res.render("user.ejs", { userList });
};

const handleCreateNewUser = (req, res, next) => {
  console.log(req.body);

  const email = userService.test_input(req.body.email);
  const username = userService.test_input(req.body.username);
  const password = userService.test_input(req.body.password);

  userService.createNewUser(email, username, password);
  // if (!email || !username || !password) {
  //   return res.status(400).json({ error: "RAWR! All fields are required" });
  // } else if (password.length < 6) {
  //   return res
  //     .status(400)
  //     .json({ error: "Woah there, that password is too short!" });
  // }
  return res.redirect("/user");
};

const handleDeleteUser = async (req, res, next) => {
  await userService.deleteUser(req.params.id);
  return res.redirect("/user");
};

export default {
  handleHomePage,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
};

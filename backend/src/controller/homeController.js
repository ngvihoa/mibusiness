import userService from "../service/userService.js";

const handleHomePage = (req, res) => {
  return res.render("home.ejs");
};

const handleUserPage = async (req, res) => {
  const userList = await userService.getUserList();
  return res.render("user.ejs", { userList });
};

const handleCreateNewUser = (req, res) => {
  const email = userService.test_input(req.body.email);
  const username = userService.test_input(req.body.username);
  const password = userService.test_input(req.body.password);

  userService.createNewUser(email, username, password);
  return res.redirect("/user");
};

const handleDeleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);
  return res.redirect("/user");
};

const handleUpdateUserPage = async (req, res) => {
  const id = req.params.id;
  const user = await userService.getUserById(id);
  let userData = {};
  userData = user;
  // if (user && user.length > 0) {
  //   userData = user[0];
  // }
  return res.render("user-update.ejs", { userData });
};

const handleUpdateUser = async (req, res) => {
  const email = userService.test_input(req.body.email);
  const username = userService.test_input(req.body.username);
  const id = req.body.id;
  await userService.updateUserInfo(id, email, username);
  return res.redirect("/user");
};

export default {
  handleHomePage,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
  handleUpdateUserPage,
  handleUpdateUser,
};

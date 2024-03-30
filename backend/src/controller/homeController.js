const handleHomePage = (req, res, next) => {
  return res.render("home.ejs");
};

const handleUserPage = (req, res, next) => {
  return res.render("user.ejs");
};

// export { handleHomePage, handleUserPage };
export default { handleHomePage, handleUserPage };

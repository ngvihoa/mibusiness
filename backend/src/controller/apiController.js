import accountService from "../service/accountService";

const testApi = (req, res) => {
  return res.status(200).json({ message: "API is working", data: "test data" });
};

const handleSignUp = async (req, res, next) => {
  try {
    if (
      !req.body.email ||
      !req.body.username ||
      !req.body.phone ||
      !req.body.password ||
      !req.body.confirmPassword
    ) {
      return res.status(400).json({
        EM: "Missing required fields!",
        EC: "-1",
        DT: "",
      });
    }

    const email = accountService.test_input(req.body.email);
    const username = accountService.test_input(req.body.username);
    const phone = accountService.test_input(req.body.phone);
    const password = accountService.test_input(req.body.password);
    const confirmPassword = accountService.test_input(req.body.confirmPassword);

    if (!accountService.validateEmail(email)) {
      return res.status(400).json({
        EM: "You have entered invalid email!",
        EC: "-1",
        DT: "",
      });
    }

    if (!accountService.validatePhone(phone)) {
      return res.status(400).json({
        EM: "Phone number should have 10 digits!",
        EC: "-1",
        DT: "",
      });
    }

    if (!accountService.validatePassword(password)) {
      return res.status(400).json({
        EM: "Your password's length should have at least 8 characters!",
        EC: "-1",
        DT: "",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        EM: "Passwords do not match!",
        EC: "-1",
        DT: "",
      });
    }

    let user = { email, username, phone, password };
    // console.log(user);
    let data = await accountService.createNewUser(user);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: "",
    });
  } catch (e) {
    return res.status(500).json({
      EM: "Error from server!", // error message
      EC: "-1", // error code
      DT: "", // data
    });
  }
};

const handleLogIn = (req, res, next) => {};

export default {
  testApi,
  handleSignUp,
  handleLogIn,
};

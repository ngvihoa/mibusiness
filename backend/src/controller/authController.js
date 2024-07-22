import accountService from "../service/accountService";
import helperService from "../service/helperService";

const handleSignUp = async (req, res) => {
  try {
    if (
      !req.body.email ||
      !req.body.username ||
      !req.body.phone ||
      !req.body.password ||
      !req.body.confirmPassword
    ) {
      return res.status(400).json({
        message: "Missing required fields!",
        data: {
          isValidEmail: !!req.body.email,
          isValidUsername: !!req.body.username,
          isValidPhone: !!req.body.phone,
          isValidPassword: !!req.body.password,
          isValidConfirmPassword: !!req.body.confirmPassword,
        },
      });
    }

    const email = helperService.test_input(req.body.email);
    const username = helperService.test_input(req.body.username);
    const phone = helperService.test_input(req.body.phone);
    const password = helperService.test_input(req.body.password);
    const confirmPassword = helperService.test_input(req.body.confirmPassword);

    if (!helperService.validateEmail(email)) {
      return res.status(400).json({
        message: "You have entered invalid email!",
        data: {
          isValidEmail: false,
        },
      });
    }

    if (!helperService.validatePhone(phone)) {
      return res.status(400).json({
        message: "Phone number should have 10 digits!",
        data: {
          isValidPhone: false,
        },
      });
    }

    if (!helperService.validatePassword(password)) {
      return res.status(400).json({
        message: "Your password's length should have at least 8 characters!",
        data: {
          isValidPassword: false,
        },
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match!",
        data: {
          isValidPassword: false,
          isValidConfirmPassword: false,
        },
      });
    }

    let user = { email, username, phone, password };
    let response = await accountService.createNewUser(user);

    return res.status(response.status).json({
      message: response.message,
      data: response.data,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Server error!",
      data: null,
    });
  }
};

const handleLogIn = async (req, res) => {
  try {
    if (!req.body.keyLogin || !req.body.password) {
      return res.status(400).json({
        message: "Missing required fields!",
        data: {
          isValidKeyLogin: !!req.body.keyLogin,
          isValidPassword: !!req.body.password,
        },
      });
    }

    const keyLogin = helperService.test_input(req.body.keyLogin);
    const password = helperService.test_input(req.body.password);

    // validate input
    if (
      !helperService.validateEmail(keyLogin) &&
      !helperService.validatePhone(keyLogin) &&
      !helperService.validatePassword(password)
    ) {
      return res.status(400).json({
        message: "Your email, phone number or password is incorrect!",
        data: {
          isValidKeyLogin: false,
          isValidPassword: false,
        },
      });
    }

    // check user
    let response = await accountService.handleUserLogIn(req.body);
    if (response.status !== 200) {
      return res.status(response.status).json({
        message: response.message,
        data: response.data,
      });
    }

    //set cookie
    res.cookie("jwt", response.data.access_token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: response.message,
      data: response.data,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Server error!",
      data: null,
    });
  }
};

const handleLogOut = async (req, res) => {
  try {
    //set cookie
    res.clearCookie("jwt");

    return res.status(200).json({
      message: "ok",
      data: null,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Server error!",
      data: null,
    });
  }
};

export default {
  handleSignUp,
  handleLogIn,
  handleLogOut,
};

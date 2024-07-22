import userApiService from "../service/userApiService";
import helperService from "../service/helperService";

const createFunc = async (req, res) => {
  try {
    if (
      !req.body.email ||
      !req.body.username ||
      !req.body.phone ||
      !req.body.password ||
      !req.body.groupId
    ) {
      return res.status(400).json({
        message: "Missing required fields!",
        data: {
          email: !!req.body.email,
          username: !!req.body.username,
          phone: !!req.body.phone,
          password: !!req.body.password,
          groupId: !!req.body.groupId,
        },
      });
    }

    const email = helperService.test_input(req.body.email);
    const username = helperService.test_input(req.body.username);
    const phone = helperService.test_input(req.body.phone);
    const password = helperService.test_input(req.body.password);
    const address = helperService.test_input(req.body.address);
    const sex = helperService.test_input(req.body.sex);
    const groupId = Number(req.body.groupId);

    if (!helperService.validateEmail(email)) {
      return res.status(400).json({
        message: "You have entered invalid email!",
        data: {
          email: false,
        },
      });
    }

    if (!helperService.validatePhone(phone)) {
      return res.status(400).json({
        message: "Phone number should have 10 digits!",
        data: {
          phone: false,
        },
      });
    }

    if (!helperService.validatePassword(password)) {
      return res.status(400).json({
        message: "Your password's length should have at least 8 characters!",
        data: {
          password: false,
        },
      });
    }

    if (!helperService.validateGroup(groupId)) {
      return res.status(400).json({
        message: "Group id is invalid",
        data: {
          groupId: false,
        },
      });
    }

    let user = { email, username, phone, password, address, sex, groupId };
    let response = await userApiService.createNewUser(user);
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

const readFunc = async (req, res) => {
  try {
    let response;
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;
      response = await userApiService.getUserPaginated(page, limit);
    } else {
      response = await userApiService.getAllUsers();
    }
    return res.status(response.status).json({
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

const updateFunc = async (req, res) => {
  try {
    let id = Number(req.body.id);
    if (id === null || id === undefined || isNaN(id)) {
      return res.status(400).json({
        message: "Missing user id!",
        data: {},
      });
    }

    if (!req.body.username || !req.body.groupId) {
      return res.status(400).json({
        message: "Missing required fields!",
        data: {
          username: !!req.body.username,
          groupId: !!req.body.groupId,
        },
      });
    }

    const username = helperService.test_input(req.body.username);
    const address = helperService.test_input(req.body.address);
    const sex = helperService.test_input(req.body.sex);
    const groupId = Number(req.body.groupId);

    if (!helperService.validateGroup(groupId)) {
      return res.status(400).json({
        message: "Group Id is invalid",
        data: {
          groupId: false,
        },
      });
    }

    let user = { id, username, address, sex, groupId };
    let response = await userApiService.updateUser(user);
    return res.status(response.status).json({
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

const deleteFunc = async (req, res) => {
  try {
    const id = req.body.id;
    let response = await userApiService.deleteUser(id);
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

const getUserAccount = async (req, res) => {
  console.log(">>> checking token valid:", req.user);
};

export default {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
  getUserAccount,
};

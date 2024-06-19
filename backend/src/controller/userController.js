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
        EM: "Missing required fields!",
        EC: "-1",
        DT: {
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
        EM: "You have entered invalid email!",
        EC: "-1",
        DT: {
          email: false,
        },
      });
    }

    if (!helperService.validatePhone(phone)) {
      return res.status(400).json({
        EM: "Phone number should have 10 digits!",
        EC: "-1",
        DT: {
          phone: false,
        },
      });
    }

    if (!helperService.validatePassword(password)) {
      return res.status(400).json({
        EM: "Your password's length should have at least 8 characters!",
        EC: "-1",
        DT: {
          password: false,
        },
      });
    }

    if (!helperService.validateGroup(groupId)) {
      return res.status(400).json({
        EM: "Group Id is invalid",
        EC: "-1",
        DT: {
          groupId: false,
        },
      });
    }

    let user = { email, username, phone, password, address, sex, groupId };
    // console.log(user);
    let data = await userApiService.createNewUser(user);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "Error from server!",
      EC: -1,
      DT: "",
    });
  }
};

const readFunc = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;
      let data = await userApiService.getUserPaginated(page, limit);

      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } else {
      let data = await userApiService.getAllUsers();

      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "Error from server!",
      EC: -1,
      DT: "",
    });
  }
};

const updateFunc = async (req, res) => {
  try {
    let id = Number(req.body.id);
    if (id === null || id === undefined || isNaN(id)) {
      return res.status(400).json({
        EM: "Missing user id!",
        EC: "-1",
        DT: {},
      });
    }

    if (!req.body.username || !req.body.groupId) {
      return res.status(400).json({
        EM: "Missing required fields!",
        EC: "-1",
        DT: {
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
        EM: "Group Id is invalid",
        EC: "-1",
        DT: {
          groupId: false,
        },
      });
    }

    let user = { id, username, address, sex, groupId };
    // console.log(user);
    let data = await userApiService.updateUser(user);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "Error from server!",
      EC: -1,
      DT: "",
    });
  }
};
const deleteFunc = async (req, res) => {
  try {
    const id = req.body.id;
    let data = await userApiService.deleteUser(id);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "Error from server!",
      EC: -1,
      DT: "",
    });
  }
};

export default {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
};

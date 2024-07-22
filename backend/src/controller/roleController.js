import roleApiService from "../service/roleApiService";
import helperService from "../service/helperService";

const createFunc = async (req, res) => {
  try {
    // add to db
    let response = await roleApiService.createNewRoles(req.body);
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
  let response = null;
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;
      response = await roleApiService.getRolePaginated(page, limit);
    } else {
      response = await roleApiService.getAllRoles();
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
  // try {
  //   let id = Number(req.body.id);
  //   if (id === null || id === undefined || isNaN(id)) {
  //     return res.status(400).json({
  //       message: "Missing user id!",
  //       data: {},
  //     });
  //   }
  //   if (!req.body.username || !req.body.groupId) {
  //     return res.status(400).json({
  //       message: "Missing required fields!",
  //       data: {
  //         username: !!req.body.username,
  //         groupId: !!req.body.groupId,
  //       },
  //     });
  //   }
  //   const username = helperService.test_input(req.body.username);
  //   const address = helperService.test_input(req.body.address);
  //   const sex = helperService.test_input(req.body.sex);
  //   const groupId = Number(req.body.groupId);
  //   if (!helperService.validateGroup(groupId)) {
  //     return res.status(400).json({
  //       message: "Group id is invalid",
  //       data: {
  //         groupId: false,
  //       },
  //     });
  //   }
  //   let user = { id, username, address, sex, groupId };
  //   let response = await userApiService.updateUser(user);
  //   return res.status(response.status).json({
  //     message: response.message,
  //     data: response.data,
  //   });
  // } catch (e) {
  //   console.log(e);
  //   return res.status(500).json({
  //     message: "Server error!",
  //     data: null,
  //   });
  // }
};

const deleteFunc = async (req, res) => {
  try {
    const id = req.body.id;
    let response = await roleApiService.deleteRole(id);
    return res.status(response.status).json({
      message: `Role ${req.body.url} is deleted!`,
      data: response.data,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Server error!",
      data: null,
    });
  }
};

const getRolesByGroup = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    let response = await roleApiService.getRolesByGroup(groupId);
    return res.status(response.status).json({
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error!",
      data: null,
    });
  }
};

const assignRoles = async (req, res) => {
  try {
    const groupId = req.body.groupId;
    const groupRoles = req.body.groupRoles;
    let response = await roleApiService.assignRolesToGroup(groupId, groupRoles);
    return res.status(response.status).json({
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: "Server error!",
      data: null,
    });
  }
};

export default {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
  getRolesByGroup,
  assignRoles,
};

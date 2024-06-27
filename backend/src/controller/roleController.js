import roleApiService from "../service/roleApiService";
import helperService from "../service/helperService";

const createFunc = async (req, res) => {
  try {
    // add to db
    let data = await roleApiService.createNewRoles(req.body);
    if (+data.EC === -1) {
      return res.status(400).json({
        EM: data.EM,
        EC: "-1",
        DT: data.DT,
      });
    } else if (+data.EC === -2) {
      throw new Error();
    }
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "Error from server!",
      EC: -2,
      DT: "",
    });
  }
};

const readFunc = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;
      let data = await roleApiService.getRolePaginated(page, limit);
      if (+data.EC === -2) throw new Error();
      return res.status(200).json({
        EM: data.EM,
        EC: 0,
        DT: data.DT,
      });
    } else {
      let data = await roleApiService.getAllRoles();
      if (+data.EC === -2) throw new Error();
      return res.status(200).json({
        EM: data.EM,
        EC: 0,
        DT: data.DT,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "Error from server!",
      EC: -2,
      DT: "",
    });
  }
};

const updateFunc = async (req, res) => {
  // try {
  //   let id = Number(req.body.id);
  //   if (id === null || id === undefined || isNaN(id)) {
  //     return res.status(400).json({
  //       EM: "Missing user id!",
  //       EC: "-1",
  //       DT: {},
  //     });
  //   }
  //   if (!req.body.username || !req.body.groupId) {
  //     return res.status(400).json({
  //       EM: "Missing required fields!",
  //       EC: "-1",
  //       DT: {
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
  //       EM: "Group Id is invalid",
  //       EC: "-1",
  //       DT: {
  //         groupId: false,
  //       },
  //     });
  //   }
  //   let user = { id, username, address, sex, groupId };
  //   let data = await userApiService.updateUser(user);
  //   if (+data.EC === -1) {
  //     return res.status(400).json({
  //       EM: data.EM,
  //       EC: "-1",
  //       DT: data.DT,
  //     });
  //   } else if (+data.EC === -2) {
  //     throw new Error();
  //   }
  //   return res.status(200).json({
  //     EM: data.EM,
  //     EC: data.EC,
  //     DT: data.DT,
  //   });
  // } catch (e) {
  //   console.log(e);
  //   return res.status(500).json({
  //     EM: "Error from server!",
  //     EC: -2,
  //     DT: "",
  //   });
  // }
};

const deleteFunc = async (req, res) => {
  try {
    const id = req.body.id;
    let data = await roleApiService.deleteRole(id);
    if (+data.EC === -2) throw new Error();

    return res.status(200).json({
      EM: `Role ${req.body.url} is deleted!`,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "Error from server!",
      EC: -2,
      DT: "",
    });
  }
};

const getRolesByGroup = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    let data = await roleApiService.getRolesByGroup(groupId);
    if (+data.EC === -2) throw new Error();
    return res.status(200).json({
      EM: data.EM,
      EC: 0,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server!",
      EC: -2,
      DT: "",
    });
  }
};

const assignRoles = async (req, res) => {
  try {
    const groupId = req.body.groupId;
    const groupRoles = req.body.groupRoles;
    let data = await roleApiService.assignRolesToGroup(groupId, groupRoles);
    if (+data.EC === -2) throw new Error();
    return res.status(200).json({
      EM: data.EM,
      EC: 0,
      DT: data.DT,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      EM: "Error from server!",
      EC: -2,
      DT: "",
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

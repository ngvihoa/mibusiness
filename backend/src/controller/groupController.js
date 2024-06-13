import groupApiService from "../service/groupApiService";

const createFunc = async (req, res, next) => {
  try {
  } catch (e) {
    return res.status(500).json({
      EM: "Error from server!",
      EC: -1,
      DT: "",
    });
  }
};

const readFunc = async (req, res, next) => {
  try {
    let data = await groupApiService.getGroups();

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "Error from server!",
      EC: -1,
      DT: "",
    });
  }
};

const updateFunc = async (req, res, next) => {
  try {
  } catch (e) {
    return res.status(500).json({
      EM: "Error from server!",
      EC: -1,
      DT: "",
    });
  }
};
const deleteFunc = async (req, res, next) => {
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

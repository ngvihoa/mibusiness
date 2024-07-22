import groupApiService from "../service/groupApiService";

const createFunc = async (req, res) => {
  try {
    // add to db
    let response = await groupApiService.createNewGroups(req.body);
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

const readFunc = async (req, res) => {
  try {
    let response = await groupApiService.getGroups();
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
    if (!req.body.id || !req.body.name) {
      return res.status(400).json({
        message: "Missing required fields!",
        data: null,
      });
    }
    let response = await groupApiService.updateGroup(req.body);
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

const deleteFunc = async (req, res) => {
  try {
    const id = req.body.id;
    let response = await groupApiService.deleteGroup(id);

    let message =
      response.status === 200
        ? `Group ${req.body.name} is deleted!`
        : response.message;
    return res.status(response.status).json({
      message: message,
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

export default {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
};

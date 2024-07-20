import projectApiService from "../service/projectApiService";

const readFunc = async (req, res) => {
  try {
  } catch (error) {
    return {
      EM: "Server error!",
      EC: -2,
      DT: "",
    };
  }
};
const createFunc = async (req, res) => {
  try {
    // project name is required, the rest is optional
    // if startDate is null, take now()
    const name = req.body.name;
    if (!name) {
      return res.status(400).json({
        EM: "Project's name cannot be empty!",
        EC: -1,
        DT: "",
      });
    }

    const project = {
      name: name,
      startDate: req.body.startDate || new Date(),
      endDate: req.body.endDate || null,
      description: req.body.description || null,
      customerId: req.body.customerId || null,
    };
    // ...
    const data = await projectApiService.createProject(project);
    return res
      .status(201)
      .json({ EM: "Project is created!", EC: 0, DT: data.DT });
  } catch (error) {
    return res.status(500).json({
      EM: "Server error!",
      EC: -2,
      DT: "",
    });
  }
};
const updateFunc = async (req, res) => {
  try {
  } catch (error) {
    return {
      EM: "Server error!",
      EC: -2,
      DT: "",
    };
  }
};
const deleteFunc = async (req, res) => {
  try {
  } catch (error) {
    return {
      EM: "Server error!",
      EC: -2,
      DT: "",
    };
  }
};

export default {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
};

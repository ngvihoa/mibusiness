import projectApiService from "../service/projectApiService";

const readFunc = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      message: "Server error!",
      data: null,
    });
  }
};
const createFunc = async (req, res) => {
  try {
    // project name is required, the rest is optional
    // if startDate is null, take now()
    const name = req.body.name;
    if (!name) {
      return res.status(400).json({
        message: "Project's name cannot be empty!",
        data: "",
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
    const response = await projectApiService.createProject(project);
    return res
      .status(200)
      .json({ message: "Project is created!", data: response.data });
  } catch (error) {
    return res.status(500).json({
      message: "Server error!",
      data: null,
    });
  }
};
const updateFunc = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      message: "Server error!",
      data: null,
    });
  }
};
const deleteFunc = async (req, res) => {
  try {
  } catch (error) {
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

import groupApiService from "../service/groupApiService";

// const createFunc = async (req, res) => {
//   try {
//   } catch (e) {
//     return res.status(500).json({
//       EM: "Error from server!",
//       EC: -1,
//       DT: "",
//     });
//   }
// };

const readFunc = async (req, res) => {
  try {
    let data = await groupApiService.getGroups();
    if (+data.EC === -2) {
      throw new Error();
    }
    return res.status(200).json({
      EM: data.EM,
      EC: 0,
      DT: data.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "Error from server!",
      EC: -2,
      DT: "",
    });
  }
};

// const updateFunc = async (req, res) => {
//   try {
//   } catch (e) {
//     return res.status(500).json({
//       EM: "Error from server!",
//       EC: -1,
//       DT: "",
//     });
//   }
// };
// const deleteFunc = async (req, res) => {
//   try {
//     const id = req.body.id;
//     let data = await userApiService.deleteUser(id);

//     return res.status(200).json({
//       EM: data.EM,
//       EC: data.EC,
//       DT: data.DT,
//     });
//   } catch (e) {
//     return res.status(500).json({
//       EM: "Error from server!",
//       EC: -1,
//       DT: "",
//     });
//   }
// };

export default {
  readFunc,
  // createFunc,
  // updateFunc,
  // deleteFunc,
};

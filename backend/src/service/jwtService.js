import { raw } from "body-parser";
import db from "../models";

const getGroupWithRole = async (groupId) => {
  let role = null;
  try {
    role = await db.Group.findOne({
      where: { id: groupId },
      attributes: ["id", "name", "description"],
      include: [
        {
          model: db.Role,
          attributes: ["id", "url", "description"],
          through: { attributes: [] },
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }

  return role ? role : {};
};

export { getGroupWithRole };

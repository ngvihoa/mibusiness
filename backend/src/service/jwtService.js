import { raw } from "body-parser";
import db from "../models";

const getGroupWithRole = async (user) => {
  let role = null;
  try {
    role = await db.Group.findOne({
      where: { id: user.id },
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

import db from "../models/index.js";
import _ from "lodash";

const createNewGroups = async (groups) => {
  try {
    const oldGroups = await db.Group.findAll({
      attributes: ["name", "description"],
      raw: true,
    });
    const newGroups = groups.filter(
      (group) => !oldGroups.some((oldGroup) => oldGroup.name === group.name)
    );
    if (newGroups.length === 0) {
      return {
        message: "Nothing to create!",
        status: 400,
        data: null,
      };
    }
    let data = await db.Group.bulkCreate(newGroups);
    return {
      message: `Create successfully ${newGroups.length} group(s)!`,
      status: 200,
      data: data,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Server error!",
      status: 500,
      data: null,
    };
  }
};

const updateGroup = async (group) => {
  try {
    let groupWithId = await db.Group.findOne({
      where: { id: group.id },
    });
    const oldGroups = await db.Group.findAll({
      attributes: ["id", "name", "description"],
      raw: true,
    });
    let checkNothingToUpdate =
      groupWithId &&
      groupWithId.name === group.name &&
      groupWithId.description === group.description;
    let checkSameGroupName = oldGroups.some(
      (oldGroup) => oldGroup.name === group.name && oldGroup.id !== group.id
    );
    let preCheckMessage = !groupWithId
      ? `Group ${group.id} - ${group.name} isn't exist!`
      : checkNothingToUpdate
      ? "Nothing to update!"
      : checkSameGroupName
      ? `Group ${group.name} has existed!`
      : null;
    if (preCheckMessage) {
      return {
        message: preCheckMessage,
        status: 400,
        data: null,
      };
    }

    await groupWithId.update({
      name: group.name,
      description: group.description,
    });
    return {
      message: `Group ${group.id} - ${group.name} is updated!`,
      status: 200,
      data: null,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Server error!",
      status: 500,
      data: null,
    };
  }
};

const getGroups = async () => {
  try {
    let data = await db.Group.findAll({
      order: [["name", "ASC"]],
    });
    return {
      message: "Get groups success!",
      status: 200,
      data: data,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Server error!",
      status: 500,
      data: null,
    };
  }
};

const deleteGroup = async (id) => {
  try {
    await db.Group.destroy({
      where: { id: id },
    });
    return {
      message: "",
      status: 200,
      data: null,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Server error!",
      status: 500,
      data: null,
    };
  }
};

export default {
  getGroups,
  createNewGroups,
  deleteGroup,
  updateGroup,
};

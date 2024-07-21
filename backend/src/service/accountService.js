import { createJWT } from "../middleware/jwt.action.js";
import db from "../models/index.js";
import helperService from "./helperService.js";
import { getGroupWithRole } from "./jwtService.js";
import "dotenv/config.js";
import { Op } from "sequelize";

const createNewUser = async (rawData) => {
  try {
    // check email, phone unique
    if (await helperService.checkEmailExist(rawData.email)) {
      return {
        message: "The email has already existed.",
        status: 400,
        data: {
          isValidEmail: false,
        },
      };
    }
    if (await helperService.checkPhoneExist(rawData.phone)) {
      return {
        message: "The phone number has already existed.",
        status: 400,
        data: {
          isValidPhone: false,
        },
      };
    }

    // hash password
    let hashPass = helperService.hashPassword(rawData.password);

    // create user
    await db.User.create({
      ...rawData,
      password: hashPass,
      groupId: 4,
      sex: "other",
    });
    return {
      message: "New user has been created!",
      status: 200,
      data: null,
    };
  } catch (e) {
    return {
      message: "Server error!",
      status: 500,
      data: null,
    };
  }
};

const handleUserLogIn = async (rawData) => {
  try {
    // check user
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: rawData.keyLogin }, { phone: rawData.keyLogin }],
      },
    });

    if (user) {
      if (helperService.checkPassword(rawData.password, user.password)) {
        // get role
        let role = await getGroupWithRole(user.groupId);
        // create token
        let payloadJWT = {
          email: user.email,
          username: user.username,
          role,
        };
        let token = createJWT(payloadJWT);

        return {
          message: "Login success!",
          status: 200,
          data: {
            access_token: token,
            email: user.email,
            username: user.username,
            role,
          },
        };
      }
    }

    return {
      message: "Your email, phone number or password is incorrect",
      status: 400,
      data: {
        isValidKeyLogin: false,
        isValidPassword: false,
      },
    };
  } catch (e) {
    return {
      message: "Server error!",
      status: 500,
      data: null,
    };
  }
};

export default {
  createNewUser,
  handleUserLogIn,
};

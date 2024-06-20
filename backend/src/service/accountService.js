import { createJWT } from "../middleware/jwt.action.js";
import db from "../models/index.js";
import helperService from "./helperService.js";
import { getGroupWithRole } from "./jwtService.js";
import "dotenv/config.js";
import { Op } from "sequelize";

const createNewUser = async (rawData) => {
  // check email, phone unique
  if (await helperService.checkEmailExist(rawData.email)) {
    return {
      EM: "The email has already existed.",
      EC: "1",
      DT: {
        isValidEmail: false,
      },
    };
  }
  if (await helperService.checkPhoneExist(rawData.phone)) {
    return {
      EM: "The phone number has already existed.",
      EC: "1",
      DT: {
        isValidPhone: false,
      },
    };
  }

  // hash password
  let hashPass = helperService.hashPassword(rawData.password);

  // create user
  try {
    await db.User.create({
      ...rawData,
      password: hashPass,
      groupId: 4,
      sex: "other",
    });
    return {
      EM: "New user has been created successfully!",
      EC: "0",
      DT: "",
    };
  } catch (e) {
    return {
      EM: "Something wrong with service!",
      EC: "-2",
      DT: "",
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
          expiresIn: process.env.TOKEN_EXPIRE_TIME,
          email: user.email,
          role,
        };
        let token = createJWT(payloadJWT);

        return {
          EM: "Login success!",
          EC: 0,
          DT: {
            access_token: token,
            email: user.email,
            username: user.username,
            role,
          },
        };
      }
    }

    return {
      EM: "Your email, phone number or password is incorrect",
      EC: "-1",
      DT: {
        isValidKeyLogin: false,
        isValidPassword: false,
      },
    };
  } catch (e) {
    return {
      EM: "Something wrong with service!",
      EC: "-2",
      DT: "",
    };
  }
};

export default {
  createNewUser,
  handleUserLogIn,
};

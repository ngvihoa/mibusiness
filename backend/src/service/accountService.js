import db from "../models/index.js";
import helperService from "./helperService.js";
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
      console.log("Found user with email/phone");
      if (helperService.checkPassword(rawData.password, user.password)) {
        return {
          EM: "Login success!",
          EC: 0,
          DT: "",
        };
      }
    }

    console.log(
      "Not found user with email/phone:",
      rawData.keyLogin,
      ", password:",
      rawData.password
    );
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

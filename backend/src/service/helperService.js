import bcrypt from "bcryptjs";
import db from "../models/index.js";

// setup bcrypt
const salt = bcrypt.genSaltSync(10);

const test_input = (input) => {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  input = input
    .trim()
    .replace(/\\/g, "")
    .replace(/[&<>"']/g, (m) => map[m]);
  return input;
};

function validateEmail(email) {
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,4}$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
}

function validatePassword(password) {
  return password.length >= 8;
}

function validateGroup(group) {
  return !isNaN(group) && group >= 0;
}

function checkPassword(pass, hashPass) {
  return bcrypt.compareSync(pass, hashPass);
}

const hashPassword = (userPassword) => {
  const hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const checkEmailExist = async (email) => {
  const user = await db.User.findOne({
    where: {
      email: email,
    },
  });

  if (user) return true;
  return false;
};

const checkPhoneExist = async (phone) => {
  const user = await db.User.findOne({
    where: {
      phone: phone,
    },
  });

  if (user) return true;
  return false;
};

export default {
  test_input,
  validateEmail,
  validatePhone,
  validatePassword,
  validateGroup,
  checkEmailExist,
  checkPhoneExist,
  hashPassword,
  checkPassword,
};

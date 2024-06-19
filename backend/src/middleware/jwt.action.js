import jwt from "jsonwebtoken";
import "dotenv/config.js";

const createJWT = (payload) => {
  const key = process.env.JWT_SECRET_KEY;
  let token = null;

  try {
    token = jwt.sign(payload, key);
    return token;
  } catch (error) {
    console.log(error);
  }

  return token;
};

const verifyToken = (token) => {
  const key = process.env.JWT_SECRET_KEY;
  let data = null;

  try {
    let decoded = jwt.verify(token, key);
    data = decoded;
  } catch (error) {
    console.log(err);
  }

  return data;
};

export { createJWT, verifyToken };

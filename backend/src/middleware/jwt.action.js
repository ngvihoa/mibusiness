import jwt from "jsonwebtoken";
import "dotenv/config.js";
import { getGroupWithRole } from "../service/jwtService";
import _ from "lodash";

const nonSecurePath = ["/signup", "/login", "/logout"];

const createJWT = (payload) => {
  const key = process.env.JWT_SECRET_KEY;
  let token = null;

  try {
    token = jwt.sign(payload, key, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });
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
    console.log(error);
  }

  return data;
};

const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const checkToken = (req, res, next) => {
  if (nonSecurePath.includes(req.path)) return next();

  let cookie = req.cookies;
  const headerToken = extractToken(req);
  if ((cookie && cookie.jwt) || headerToken) {
    const token = cookie.jwt ?? headerToken;
    const decoded = verifyToken(token);

    if (decoded) {
      req.user = decoded;
      next();
    } else {
      res.status(401).json({
        message: "Unauthorized access, please login!",
        data: null,
      });
    }
  } else {
    return res.status(401).json({
      message: "Unauthorized access, please login!",
      data: null,
    });
  }
};

const checkPermission = async (req, res, next) => {
  if (nonSecurePath.includes(req.path)) return next();
  if (req.user) {
    const groupId = req.user.role.id;
    let groupRoles = null;
    try {
      groupRoles = await getGroupWithRole(groupId);
    } catch (error) {
      // console.log(">>>Checking error:::", error);
      return res.status(500).json({
        message: "Server error!",
        data: null,
      });
    }
    if (!groupRoles || _.isEmpty(groupRoles) || groupRoles.Roles.length === 0) {
      return res.status(403).json({
        message: "Forbiden access, please contact admin for more information!",
        data: null,
      });
    }
    const roles = groupRoles.Roles;
    let currentUrl = req.path;
    let currentMethod = req.method;
    let access = roles.some(
      (item) =>
        (item.url === currentUrl || currentUrl.includes(item.url)) &&
        item.method === currentMethod
    );
    if (access) {
      next();
    } else {
      return res.status(403).json({
        message: "Forbiden access, please contact admin for more information!",
        data: null,
      });
    }
  } else {
    return res.status(401).json({
      message: "Unauthorized access, please login!",
      data: null,
    });
  }
};

export { createJWT, verifyToken, checkToken, checkPermission };

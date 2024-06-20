import jwt from "jsonwebtoken";
import "dotenv/config.js";
import { getGroupWithRole } from "../service/jwtService";
import _ from "lodash";

const nonSecurePath = ["/signup", "/login"];

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
    console.log(error);
  }

  return data;
};

const checkToken = (req, res, next) => {
  console.log(req.path);
  if (nonSecurePath.includes(req.path)) return next();

  let cookie = req.cookies;
  if (cookie && cookie.jwt) {
    const token = cookie.jwt;
    const decoded = verifyToken(token);

    if (decoded) {
      req.user = decoded;
      next();
    } else {
      res.status(401).json({
        EC: -1,
        EM: "Unauthorized Access",
        DT: "",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      EM: "Unauthorized Access",
      DT: "",
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
      return res.status(500).json({
        EM: "Something wrong with service!",
        EC: "-2",
        DT: "",
      });
    }
    if (!groupRoles || _.isEmpty(groupRoles) || groupRoles.Roles.length === 0) {
      return res.status(403).json({
        EC: -1,
        EM: "You don't have permission to access this resources",
        DT: "",
      });
    }
    const roles = groupRoles.Roles;
    let currentUrl = req.path;
    let access = roles.some((item) => item.url === currentUrl);
    if (access) {
      next();
    } else {
      return res.status(403).json({
        EC: -1,
        EM: "You don't have permission to access this resources",
        DT: "",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      EM: "Unauthorized access",
      DT: "",
    });
  }
};

export { createJWT, verifyToken, checkToken, checkPermission };

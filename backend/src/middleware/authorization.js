const { handle401 } = require("../utils/response");
const blacklist = require("./blacklist");
const jwt = require("jsonwebtoken");

const accessValidation = (req, res, next) => {
  const { authorization } = req.headers;

  const isToken = !authorization
    ? handle401(req, res, "Need token")
    : blacklist.includes(authorization)
    ? handle401(req, res, "Token has been revoked")
    : null;

  if (isToken) {
    return isToken;
  }

  const token = authorization.split(" ")[1];
  const secret = process.env.SECRET_PASSWORD;

  try {
    const jwtDecode = jwt.verify(token, secret);
    req.adminData = jwtDecode;
  } catch (error) {
    return handle401(req, res, "Unauthorized");
  }
  next();
};

module.exports = { accessValidation };

const jwt = require("jsonwebtoken");
const passwordCheck = require("../utils/passwordCheck");
const blacklist = require("../middleware/blacklist");
const {
  handle200,
  handle201,
  handle400,
  handle500,
} = require("../utils/response");

const login = async (req, res) => {
  try {
    const { adminId, email, password } = req.body;
    const check = await passwordCheck(email, password);

    const secretKey = process.env.SECRET_PASSWORD;

    const payload = {
      adminId: adminId,
      email: email,
      password: password,
    };

    const token = jwt.sign(payload, secretKey, {
      expiresIn: "3d",
    });

    const isData = check.compare
      ? handle201(req, res, token, "login")
      : handle400(req, res, "login fail");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const logout = (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return handle400(req, res, "Token missing");
  }

  const token = authorization.split(" ")[1];
  const secretKey = process.env.SECRET_PASSWORD;

  try {
    const decodedToken = jwt.verify(token, secretKey);

    blacklist.addToken(token);

    return handle200(req, res, decodedToken, "Logout successful");
  } catch (error) {
    return handle400(req, res, "Invalid token");
  }
};

module.exports = { login, logout };

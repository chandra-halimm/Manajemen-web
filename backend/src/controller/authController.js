const jwt = require("jsonwebtoken");
const passwordCheck = require("../utils/passwordCheck");
const Admin = require("../models/adminModels");
const {
  handle200,
  handle201,
  handle400,
  handle500,
} = require("../utils/response");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const check = await passwordCheck(email, password);

    const isData = check.compare
      ? handle201(req, res, "login success", "login")
      : handle400(req, res, "login fail");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

module.exports = { login };

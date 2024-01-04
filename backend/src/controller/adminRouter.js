const Admin = require("../models/adminModels");
const {
  handle200,
  handle201,
  handle400,
  handle500,
} = require("../middleware/response");

const getAdmin = async (req, res) => {
  const data = await Admin.findAll();

  try {
    const isData = data
      ? handle200(req, res, data, "all")
      : handle400(req, res, "invalid paramaters");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const createAdmin = async (req, res) => {
  try {
    const { name, email, password, confPassword } = req.body;
    const data = await Admin.create({ name, email, password, confPassword });

    const checkPassword =
      password !== confPassword
        ? handle400(req, res, "password not match")
        : handle201(req, res, data, "admin");

    return checkPassword;
  } catch (error) {
    handle500(req, res, error);
  }
};

module.exports = { getAdmin, createAdmin };

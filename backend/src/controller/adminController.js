const bcrypt = require("bcrypt");
const Admin = require("../models/adminModels");
const {
  handle200,
  handle201,
  handle400,
  handle500,
} = require("../utils/response");

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
    const encryptedPassword = await bcrypt.hash(password, 10);

    const existingUser = await Admin.findOne({
      where: {
        email: email,
      },
    });

    if (existingUser) return handle400(req, res, "email has been reggistered");

    const data = await Admin.create({
      name,
      email,
      password: encryptedPassword,
      confPassword,
    });

    const isData =
      password !== confPassword
        ? handle400(req, res, "password not match")
        : handle201(req, res, data, "admin");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

module.exports = { getAdmin, createAdmin };

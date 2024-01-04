const bcrypt = require("bcrypt");
const adminModels = require("../models/adminModels");

const passwordCheck = async (email, password) => {
  const userData = await adminModels.findOne({ where: { email: email } });
  const compare = await bcrypt.compare(password, userData.password);
  return { compare, userData };
};

module.exports = passwordCheck;

const PositionModel = require("../models/position");
const { handle200, handle400, handle500 } = require("../utils/response");

const getPosition = async (req, res) => {
  try {
    const getData = PositionModel.findAll();
    const isData = getData
      ? handle200(req, res, "position")
      : handle400(req, res, "invalid parameters");
    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

module.exports = { getPosition };

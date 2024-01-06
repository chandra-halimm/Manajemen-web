const PositionModel = require("../models/position");
const {
  handle200,
  handle201,
  handle400,
  handle500,
} = require("../utils/response");

const getPosition = async (req, res) => {
  try {
    const data = await PositionModel.findAll();
    const isData = data
      ? handle200(req, res, data, "position")
      : handle400(req, res, "invalid parameters");
    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const createPosition = async (req, res) => {
  try {
    const { position } = req.body;
    const check = await PositionModel.findAll({
      where: { position: position },
    });
    const data = await PositionModel.create({ position: position });
    if (check.length > 0)
      return handle400(req, res, "position already avalaible");

    const isData = data
      ? handle201(req, res, data, "position")
      : handle400(req, res, "invalid parameters");
    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

module.exports = { getPosition, createPosition };

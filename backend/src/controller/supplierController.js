const SupplierModel = require("../models/supplierModel");
const {
  handle200,
  handle201,
  handle400,
  handle500,
} = require("../utils/response");

const getSupplier = async (req, res) => {
  try {
    const data = await SupplierModel.findAll();
    const isData = data
      ? handle200(req, res, data, "position")
      : handle400(req, res, "invalid parameters");
    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const getCountSupplier = async (req, res) => {
  try {
    const data = await SupplierModel.count();
    const isData = data
      ? handle200(req, res, data, "position")
      : handle400(req, res, "invalid parameters");
    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const createSupplier = async (req, res) => {
  try {
    const { namaSupplier, alamat, email, handphone } = req.body;
    const check = await SupplierModel.findAll({
      where: { namaSupplier: namaSupplier },
    });
    const data = await SupplierModel.create({
      namaSupplier: namaSupplier,
      alamat: alamat,
      email: email,
      handphone: handphone,
    });
    if (check.length > 0)
      return handle400(req, res, "position already avalaible");

    const isData = data
      ? handle201(req, res, data, "supplier")
      : handle400(req, res, "invalid parameters");
    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

module.exports = { getSupplier, createSupplier, getCountSupplier };

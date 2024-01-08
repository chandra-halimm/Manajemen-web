const Karyawan = require("../models/karyawanModels");
const {
  handle200,
  handle201,
  handle400,
  handle500,
} = require("../utils/response");

const getKaryawan = async (req, res) => {
  const data = await Karyawan.findAll();

  try {
    const isData = data
      ? handle200(req, res, data, "all")
      : handle400(req, res, "invalid paramaters");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const createKaryawan = async (req, res) => {
  try {
    const { nip, name, address, email, handphone, position } = req.body;

    const data = await Karyawan.create({
      nip,
      name,
      address,
      email,
      handphone,
      position,
    });

    const isData = data
      ? handle201(req, res, data, "karyawan")
      : handle400(req, res, "fail get karyawan data");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

module.exports = { getKaryawan, createKaryawan };

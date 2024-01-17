const Karyawan = require("../models/karyawanModels");
require("sequelize");
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

const getCountKaryawan = async (req, res) => {
  try {
    const count = await Karyawan.count();

    return handle200(req, res, count, "count");
  } catch (error) {
    return handle500(req, res, error);
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

const editKaryawan = async (req, res) => {
  try {
    const { nip, name, address, email, handphone, position } = req.body;
    const data = await Karyawan.update(
      {
        nip,
        name,
        address,
        email,
        handphone,
        position,
      },
      {
        where: {
          nip: nip,
        },
      }
    );

    const isData = data
      ? handle201(req, res, data, "update karyawan")
      : handle400(req, res, "fail update karyawan");
    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const deleteKaryawan = async (req, res) => {
  try {
    const { karyawanId } = req.params;
    const data = await Karyawan.findOne({
      where: { karyawanId: karyawanId },
    });

    if (data) {
      await Karyawan.destroy({
        where: { karyawanId },
      });
      handle200(req, res, data, "delete");
    } else {
      handle400(req, res, "fail delete karyawan");
    }
  } catch (error) {
    handle500(req, res, error);
  }
};

module.exports = {
  getKaryawan,
  createKaryawan,
  editKaryawan,
  getCountKaryawan,
  deleteKaryawan,
};

const Pembelian = require("../models/pembelianModel");
const Barang = require("../models/barangModels");
const Sequelize = require("sequelize");
const {
  handle200,
  handle201,
  handle400,
  handle500,
} = require("../utils/response");

const getPembelian = async (req, res) => {
  const data = await Pembelian.findAll();

  try {
    const isData = data
      ? handle200(req, res, data, "all")
      : handle400(req, res, "invalid paramaters");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const getCashPembelian = async (req, res) => {
  const data = await Pembelian.sum("harga");

  try {
    const isData = data
      ? handle200(req, res, data, "all")
      : handle400(req, res, "invalid paramaters");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const createPembelian = async (req, res) => {
  try {
    const { namaSupplier, namaBarang, harga, qty } = req.body;

    await Pembelian.create({
      namaSupplier,
      namaBarang,
      harga,
      qty,
    });
    const updatedBarang = await Barang.update(
      { stock: Sequelize.literal(`stock + ${qty}`) },
      { where: { namaBarang } }
    );

    const isUpdate = updatedBarang
      ? handle201(req, res, updatedBarang, "karyawan")
      : handle400(req, res, "fail to update karyawan data");

    return isUpdate;
  } catch (error) {
    handle500(req, res, error);
  }
};

const editPembelian = async (req, res) => {
  try {
    const { nip, name, address, email, handphone, position } = req.body;
    const data = await Pembelian.update(
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

const deletePembelian = async (req, res) => {
  try {
    const { karyawanId } = req.params;
    const data = await Pembelian.findOne({
      where: { karyawanId: karyawanId },
    });

    if (data) {
      await Pembelian.destroy({
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
  getPembelian,
  createPembelian,
  editPembelian,
  deletePembelian,
  getCashPembelian,
};

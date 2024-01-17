const Barang = require("../models/barangModels");
const Sequelize = require("sequelize");

const {
  handle200,
  handle201,
  handle400,
  handle500,
} = require("../utils/response");

const getBarang = async (req, res) => {
  const data = await Barang.findAll();

  try {
    const isData = data
      ? handle200(req, res, data, "all")
      : handle400(req, res, "invalid paramaters");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const getCountBarang = async (req, res) => {
  const data = await Barang.count();

  try {
    const isData = data
      ? handle200(req, res, data, "all")
      : handle400(req, res, "invalid paramaters");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const createBarang = async (req, res) => {
  try {
    const { kodeBarang, namaBarang, harga, stock } = req.body;

    try {
      const barangCheck = async () => {
        try {
          const check = await Barang.findOne({
            where: {
              [Sequelize.Op.or]: [
                { kodeBarang: kodeBarang },
                { namaBarang: namaBarang },
              ],
            },
          });
          return check;
        } catch (error) {
          handle500(req, res, error);
        }
      };

      const existingBarang = await barangCheck();

      if (existingBarang) return handle400(req, res, "Barang sudah ada");

      const data = await Barang.create({
        kodeBarang,
        namaBarang,
        harga,
        stock,
      });

      const isData = data
        ? handle201(req, res, data, "barang")
        : handle400(req, res, "Fail to get barang data");

      return isData;
    } catch (error) {
      throw error;
    }
  } catch (error) {
    handle500(req, res, error);
  }
};

module.exports = { getBarang, createBarang, getCountBarang };

const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/config");
const { v4: uuidv4 } = require("uuid");

const Barang = db.define("barang", {
  barangId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  kodeBarang: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  namaBarang: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  harga: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Barang.beforeCreate((barang) => {
  barang.barangId = `${uuidv4()}`;
});

module.exports = Barang;

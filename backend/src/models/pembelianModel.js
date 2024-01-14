const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/config");
const { v4: uuidv4 } = require("uuid");
const Barang = require("./barangModels");

const Pembelian = db.define("pembelian", {
  pembelianId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  namaSupplier: {
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

Pembelian.beforeCreate((admin) => {
  admin.adminId = `${uuidv4()}`;
});

Pembelian.hasMany(Barang, { onDelete: "cascade" });
Barang.belongsTo(Pembelian, { foreignKey: "pembelianID" });

module.exports = Pembelian;

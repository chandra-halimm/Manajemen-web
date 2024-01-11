const db = require("../config/config");
const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const { v4: uuidv4 } = require("uuid");

const Supplier = db.define("supplier", {
  supplierId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  namaSupplier: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alamat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  handphone: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Supplier.beforeCreate((supplier) => {
  supplier.supplierId = `${uuidv4}`;
});

module.exports = Supplier;

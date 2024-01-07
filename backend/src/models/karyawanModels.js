const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/config");
const { v4: uuidv4 } = require("uuid");
const position = require("./positionModel");

const karyawan = db.define("karyawan", {
  karyawanId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  nip: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
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
  positionId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

karyawan.beforeCreate((admin) => {
  admin.adminId = `${uuidv4()}`;
});

position.hasMany(karyawan, { onDelete: "cascade" });
karyawan.belongsTo(position, { foreignKey: "positionId" });

module.exports = karyawan;

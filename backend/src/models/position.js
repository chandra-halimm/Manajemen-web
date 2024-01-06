const db = require("../config/config");
const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const { v4: uuidv4 } = require("uuid");

const position = db.define("position", {
  positionId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  position: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

position.beforeCreate((position) => {
  position.positionId = `${uuidv4}`;
});

module.exports = position;

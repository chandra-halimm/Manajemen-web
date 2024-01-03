const { Sequelize } = require("sequelize");

const db = new Sequelize("manajemen-web", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;

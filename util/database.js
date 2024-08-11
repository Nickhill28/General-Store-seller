const Sequelize = require("sequelize");

const sequelize = new Sequelize("expense_app", "root", "Nick@root21", {
  dialect: "mysql",
  host: "localhost",
  port: 3306 // Specify the port as an option
});

module.exports = sequelize;

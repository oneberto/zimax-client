const { Sequelize } = require("@sequelize/core");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db/db.db3",
  // dialectOptions: {
  //   requestTimeout: 1500,
  // },
  // mode: "OPEN_URI",
});

module.exports = { sequelize };

const { Sequelize } = require("@sequelize/core");

const initSequelize = () =>
  new Sequelize({
    dialect: "sqlite",
    storage: "../HMI_RT_2_TLG291_20240910_180124.db3",
    // dialectOptions: {
    //   requestTimeout: 1500,
    // },
    // mode: "OPEN_URI",
  });

module.exports = { initSequelize };

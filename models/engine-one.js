const { DataTypes } = require("@sequelize/core");
const { sequelize } = require("../services/sequelize");

const EngineOne = sequelize.define(
  "EngineOne",
  {
    pk_TimeStamp: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    pk_fk_Id: {
      type: DataTypes.INTEGER,
    },
    Quality: {
      type: DataTypes.INTEGER,
    },
    Value: {
      type: DataTypes.DOUBLE,
    },
  },
  {
    // Other model options go here
    // name: {
    //   singular: "EngineOne",
    //   plural: "EngineOne",
    // },

    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = {
  EngineOne,
};

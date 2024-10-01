const { DataTypes } = require("@sequelize/core");

const EngineOne = (sequelize) => {
  const model = sequelize.define(
    "LoggedProcessValue",
    {
      Value: {
        type: DataTypes.DOUBLE,
      },
      pk_TimeStamp: {
        type: DataTypes.STRING,
        primaryKey: true,
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

  return model;
};

module.exports = {
  EngineOne,
};

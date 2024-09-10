const { EngineOne } = require("../models/engine-one");
const { findLastItem } = require("../utils/find-last-item");

const get = async (req, res) => {
  const value = await findLastItem(EngineOne);

  res.json({
    value,
  });
};

module.exports = {
  get,
};

// "value": {
//     "pk_TimeStamp": 133639837159918830,
//     "pk_fk_Id": 1,
//     "Quality": 192,
//     "Value": 29.4538631439209
//   }

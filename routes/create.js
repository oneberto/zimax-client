const { EngineOne } = require("../models/engine-one");
const { EngineThree } = require("../models/engine-three");
const { EngineTwo } = require("../models/engine-two");

const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateData = () => ({
  pk_TimeStamp: new Date().getTime(),
  pk_fk_Id: 2,
  Quality: 1,
  Value: randomInteger(1, 100),
});

const create = async (req, res) => {
  try {
    const engineOne = await EngineOne.create(generateData());
    const engineTwo = await EngineTwo.create(generateData());
    const engineThree = await EngineThree.create(generateData());

    res.json({
      engineOne,
      engineTwo,
      engineThree,
    });
  } catch (error) {
    console.error(error);
    // res.status(500);
    res.status(500).json({
      error: true,
    });
  }
};

module.exports = {
  create,
};

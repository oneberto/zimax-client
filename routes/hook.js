const { EngineOne } = require("../models/engine-one");
const { EngineThree } = require("../models/engine-three");
const { EngineTwo } = require("../models/engine-two");

const hook = async (req, res) => {
  try {
    // const engineOne = await EngineOne.create(generateData());
    // const engineTwo = await EngineTwo.create(generateData());
    // const engineThree = await EngineThree.create(generateData());

    console.log(req.body);

    res.json({
      success: true,
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
  hook,
};

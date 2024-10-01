const axios = require("axios");
const dayjs = require("dayjs");
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

const { initSequelize } = require("./services/sequelize");

const { EngineOne } = require("./models/engine-one");

const last = require("lodash/last");
const sortBy = require("lodash/sortBy");

const sequelize = initSequelize();

const getLastItem = async (sequelize) => {
  const engine = EngineOne(sequelize);

  await engine.sync();

  const all = await engine.findAll();

  const arr = sortBy(
    [...all].map((item) => ({
      ...item,
      pk_TimeStamp: String(item.pk_TimeStamp),
    })),
    ["pk_TimeStamp"]
  );

  const lastItem = last(arr);

  return lastItem;
};

var lastSentTimeStamp;

const DELAY = 2000;

const sendLastItem = async () => {
  console.count("SEND LAST ITEM");

  const lastItem = await getLastItem(sequelize);

  if (!lastItem?.pk_TimeStamp) {
    console.count("TIMESTAMP NOT SET");

    setTimeout(sendLastItem, DELAY);

    return;
  }

  if (lastItem?.pk_TimeStamp === lastSentTimeStamp) {
    console.count("DUPLICATED ITEM");

    setTimeout(sendLastItem, DELAY);

    return;
  }

  try {
    const payload = {
      value: lastItem.dataValues.Value,
      pk_TimeStamp: lastItem?.pk_TimeStamp,
    };

    console.log({
      payload,
      lastItem,
    });

    await axios.post(`http://localhost:3009/create`, payload);

    lastSentTimeStamp = lastItem?.pk_TimeStamp;
  } catch (error) {
    console.log("ERROR SENDING ITEM TO THE API", error);
  } finally {
    setTimeout(sendLastItem, DELAY);
  }
};

sendLastItem();

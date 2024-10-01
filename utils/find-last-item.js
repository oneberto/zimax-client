const findLastItem = async (engine) => {
  await engine.sync();

  const value = await engine.findOne({
    order: [["pk_TimeStamp", "DESC"]],
    // where: { pk_TimeStamp: "133704630705143838" },
  });

  return value;
};

module.exports = {
  findLastItem,
};

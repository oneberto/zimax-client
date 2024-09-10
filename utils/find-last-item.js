const findLastItem = async (Engine) => {
  await Engine.sync();

  const value = await Engine.findOne({
    order: [["pk_TimeStamp", "DESC"]],
  });

  return value;
};

module.exports = {
  findLastItem,
};

const download = async (req, res) => {
  await require("../utils/download-db")();

  res.json({
    success: true,
  });
};

module.exports = {
  download,
};

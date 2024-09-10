const deleteRoute = async (req, res) => {
  try {
    await require("../utils/delete-db")();
  } catch (error) {
    console.log(error);
  }

  res.json({
    success: true,
  });
};

module.exports = {
  deleteRoute,
};

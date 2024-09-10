const fs = require("fs");

function deleteFile(file) {
  try {
    fs.rm(file, {
      force: true,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = async function () {
  try {
    fs.rmSync("db/db.db3", {
      force: true,
    });
  } catch (error) {
    console.log(error);
  }
};

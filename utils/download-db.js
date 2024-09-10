const http = require("http");
const fs = require("fs");

module.exports = async function () {
  const fileUrl = "http://192.168.1.10:3000/db.db3";
  const destination = "db/db.db3";

  const file = fs.createWriteStream(destination);

  return await new Promise((resolve, reject) => {
    http
      .get(fileUrl, (response) => {
        response.pipe(file);
        file.on("finish", () => {
          file.close(() => {
            console.log("File downloaded successfully");

            resolve({
              success: true,
            });
          });
        });
      })
      .on("error", (err) => {
        fs.unlink(destination, () => {
          console.error("Error downloading file:", err);
          reject({
            error: true,
          });
        });
      });
  });
};

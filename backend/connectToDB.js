const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
module.exports = async function connectToDB(url) {
  await mongoose.connect(url, { autoCreate: true, autoIndex: true }, function (
    err
  ) {
    if (err) {
      process.exit();
    } else {
      console.log("Connected to mongoDB", mongoose.connection.host);
    }
  });
};

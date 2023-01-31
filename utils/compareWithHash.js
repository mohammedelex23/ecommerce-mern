const bcrypt = require("bcrypt");
const saltRounds = 10;

function compareWithHash(data, hash) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(data, hash, function (err, result) {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

module.exports = compareWithHash;

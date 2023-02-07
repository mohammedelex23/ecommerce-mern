const bcrypt = require("bcrypt");
const saltRounds = 15;

function generateHash(data) {
  return new Promise(function (resolve, reject) {
    bcrypt.hash(data, saltRounds, function (err, hash) {
      if (err) reject(err);
      else resolve(hash);
    });
  });
}

module.exports = generateHash;

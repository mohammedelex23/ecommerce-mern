const jwt = require("jsonwebtoken");
function verifyJWTtoken(token) {
  return new Promise(function (resolve, reject) {
    jwt.verify(token, process.env.MY_SECRET, function (err, decoded) {
      if (err) reject(err);
      else resolve(decoded);
    });
  });
}

module.exports = verifyJWTtoken;

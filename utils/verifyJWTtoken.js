const jwt = require("jsonwebtoken");
function verifyJWTtoken(token) {
  console.log(token);
  return new Promise(function (resolve, reject) {
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) reject(err);
      else resolve(decoded);
    });
  });
}

module.exports = verifyJWTtoken;

const jwt = require("jsonwebtoken");
function generateJWTtoken(obj, expiresIn = "2 days") {
  return jwt.sign(obj, process.env.MY_SECRET, {
    expiresIn,
  });
}

module.exports = generateJWTtoken;

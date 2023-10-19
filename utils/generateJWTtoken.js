const jwt = require("jsonwebtoken");
function generateJWTtoken(obj, expiresIn = "2 days") {
  return jwt.sign(obj, process.env.JWT_SECRET, {
    expiresIn,
  });
}

module.exports = generateJWTtoken;

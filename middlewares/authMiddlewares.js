const verifyJWTtoken = require("../utils/verifyJWTtoken");
const {
  BadRequest,
  UnAuthenticated,
  UnAuthorized,
  Conflict,
} = require("../error/errorClass");
const User = require("../models/user.model");

const verifyToken = async function (req, res, next) {
  const bearerHeader = req?.headers["authorization"];
  if (!bearerHeader) {
    return next(
      new BadRequest("please send the authorization header with bearer token","TokenError")
    );
  }
  const token = bearerHeader.split(" ")[1];

  try {
    let { id } = await verifyJWTtoken(token);
    req.userId = id;
    next();
  } catch (error) {
    next(error);
  }
};

const userIsVerified = async function (req, res, next) {
  try {
    let user = await User.findById(req.query.userId).select("-password");

    if (!user) {
      return next(new UnAuthorized("invalid token"));
    }
    if (user.isVerified) {
      return next(new Conflict("user account is already verified"));
    }
    next();
  } catch (error) {
    next(error);
  }
};

const authenticateUser = async function (req, res, next) {
  try {
    let user = await User.findById(req.userId);
    if (!user) {
      return next(new UnAuthenticated("user is not found"));
    }
    if (!user.isVerified) {
      return next(new UnAuthorized("account is not verified"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { verifyToken, authenticateUser, userIsVerified };

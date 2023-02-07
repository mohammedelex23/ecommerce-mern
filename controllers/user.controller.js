const User = require("../models/user.model");

const getAllUsers = async function (req, res, next) {
  try {
    let users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getOneUser = async function (req, res, next) {
  try {
    let user = await User.findById(req.params.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, getOneUser };

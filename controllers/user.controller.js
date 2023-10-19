const { BadRequest, UnAuthorized } = require("../error/errorClass");
const User = require("../models/user.model");
const compareWithHash = require("../utils/compareWithHash");
const generateHash = require("../utils/generateHash");

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
const updateUser = async function (req, res, next) {
  try {
    const body = req.body;
    let user = await User.findById(req.params.id);
    let isValid = await compareWithHash(body.oldPassword, user.password);
    if (!isValid) {
      return res
        .status(403)
        .json({ type: "passwordError", message: "password is wrong" });
    }

    if (body.newPassword) {
      let hash = await generateHash(body.newPassword);
      user.password = hash;
    } else {
      user.password = user.password;
    }

    user.name = body.name || user.name;
    user.email = body.email || user.email;
    user.shippingAddress = body.shippingAddress || user.shippingAddress;

    user = await user.save();
    user.password = undefined;

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getShippingAddress = async function (req, res, next) {
  try {
    let data = await User.findById(req.params.id).select(
      "shippingAddress -_id"
    );
    let shippingAddress = data.shippingAddress;
    if (Object.keys(shippingAddress).length === 0) {
      return res.status(200).json(null);
    }
    res.status(200).json(shippingAddress);
  } catch (error) {
    next(error);
  }
};
const setShippingAddress = async function (req, res, next) {
  try {
    let shippingAddress = req.body;
    let user = await User.findById(req.params.id).select("-password");
    user.shippingAddress = shippingAddress;
    user = await user.save();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  getShippingAddress,
  setShippingAddress,
  updateUser,
};

const User = require("../models/user.model");
const generateToken = require("../utils/generateJWTtoken");
const {
  UnAuthenticated,
  UnAuthorized,
  BadRequest,
} = require("../error/errorClass");
const generateHash = require("../utils/generateHash");
const compareWithHash = require("../utils/compareWithHash");
const sendEmail = require("../utils/sendEmail");

const signup = async function (req, res, next) {
  try {
    const { name, email, password } = req.body;

    // check for user duplication
    let foundUser = await User.findOne({ email });
    if (foundUser) {
      return next(new BadRequest("you can not use this email"));
    }
    const hash = await generateHash(password);

    let user = new User({
      name,
      email,
      password: hash,
    });
    user = await user.save();

    // send verification email to the user
    const token = await generateToken({ id: user.id }, "2h");
    sendEmail(email, token, user.name, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
    });

    user.password = undefined;
    user.isAdmin = undefined;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
const login = async function (req, res, next) {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return next(new UnAuthenticated("invalid email or password"));
    }

    let isValid = await compareWithHash(password, user.password);
    if (!isValid) {
      return next(new UnAuthenticated("invalid email or password"));
    }
    if (!user.isVerified) {
      return res.status(403).json({
        type: "AccountVerification",
        message: "your account is not verified yet",
      });
    }
    const token = generateToken({ id: user._id, isAdmin: user.isAdmin });
    user.password = undefined;
    res.status(200).json({
      ...user._doc,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const verifyAccount = async function (req, res, next) {
  try {
    let user = await User.findByIdAndUpdate(
      req.userId,
      {
        $set: { isVerified: true },
      },
      { new: true }
    ).select("-password");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  verifyAccount,
};

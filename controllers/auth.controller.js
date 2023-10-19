const User = require("../models/user.model");
const generateToken = require("../utils/generateJWTtoken");
const {
  UnAuthenticated,
  UnAuthorized,
  BadRequest,
  Conflict,
} = require("../error/errorClass");
const compareWithHash = require("../utils/compareWithHash");
const sendEmail = require("../utils/sendEmail");
const verifyJWTtoken = require("../utils/verifyJWTtoken");
const generateHash = require("../utils/generateHash");

const signup = async function (req, res, next) {
  try {
    const { name, email, password } = req.body;
    let hash = await generateHash(password);

    let user = new User({
      name,
      email,
      password: hash,
    });
    user = await user.save();

    // send verification email to the user
    let token = generateToken(
      {
        id: user._id,
      },
      "3000s"
    );
    sendEmail({
      email,
      token,
      name: user.name,
      userId: user._id,
      cb: function (err, info) {
        if (err) console.log(err);
        else console.log(info);
      },
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
    console.log(isValid);
    if (!isValid) {
      return next(new UnAuthenticated("invalid email or password"));
    }
    if (!user.isVerified) {
      return next(new UnAuthenticated("your account is not verified yet"));
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
    let user = await User.findeById(req.userId);
    if (!user) {
      return next(new BadRequest("user is not found"));
    }
    if (user.isVerified) {
      return next(new Conflict("user is already verified"));
    }
    user.isVerified = true;
    await user.save();
    res.status(200).send("account is verified");
  } catch (error) {
    next(error);
  }
};

const resendEmail = async function (req, res, next) {
  try {
    let user = await User.findById(req.params.userId);
    if (!user) {
      return next(new UnAuthorized("invalid token"));
    }
    // send verification email to the user
    let token = generateToken(
      {
        id: user._id,
      },
      "3000s"
    );
    sendEmail({
      email,
      token,
      name: user.name,
      userId: user._id,
      cb: function (err, info) {
        if (err) console.log(err);
        else console.log(info);
      },
    });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async function (req, res, next) {
  try {
    const email = req.body.email;
    let user = await User.findOne({ email });
    if (!user) {
      return next(new UnAuthorized("you can't use this email"));
    }
    let token = generateToken(
      {
        id: user._id,
      },
      "1800s" // 30 minutes
    );
    sendEmail({
      email,
      token,
      name: user.name,
      userId: user._id,
      cb: function (err, info) {
        if (err) console.log(err);
        else console.log(info);
      },
    });
    res.status(200).json("check your  email and follow the reset link");
  } catch (error) {
    next(error);
  }
};
const resetPassword = async function (req, res, next) {
  try {
    const { email, password, token } = req.body;
    let { id } = await verifyJWTtoken(token);

    let user = await User.findById(id);

    if (user.email !== email) {
      return next(new UnAuthorized("you can't use this email"));
    }

    user.password = password;
    await user.save();
    res.status(200).json("password reset successfully");
  } catch (error) {
    next(error);
  }
};
module.exports = {
  signup,
  login,
  verifyAccount,
  resendEmail,
  forgotPassword,
  resetPassword,
};

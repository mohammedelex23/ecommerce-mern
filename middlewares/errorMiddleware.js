const erorMiddleware = function (error, req, res, next) {
  console.log("error code",error.code,error);
  if (
    error.name === "TokenExpiredError" ||
    error.name === "JsonWebTokenError" ||
    error.name === "NotBeforeError"
  ) {
    return res.status(401).json({
      name: "TokenError",
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
    });
  }
  if (error.code === 11000) {
    error.code = 400;
    if (error["keyPattern"]["name"]) {
      return res.status(400).json({
        name: "nameError",
        message: "you can't use this name",
      });
    } else {
      error.message = "you can't use this email";
    }
  }

  res.status(error.statusCode || error.code || 500).json({
    message: error.message || "something went wrong",
    name: error.name,
    // stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
  });
};

module.exports = erorMiddleware;

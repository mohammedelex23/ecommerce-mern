const erorMiddleware = function (error, req, res, next) {
  console.log(error);

  if (
    error.name === "TokenExpiredError" ||
    error.name === "JsonWebTokenError" ||
    error.name === "NotBeforeError"
  ) {
    return res.status(401).json({
      name: "TokenError",
      message: "invalid token",
      stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
    });
  }

  res.status(error.code || 500).json({
    message: error.message || "something went wrong",
    // stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
  });
};

module.exports = erorMiddleware;

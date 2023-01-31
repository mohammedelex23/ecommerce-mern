const notFoundMiddleware = function (req, res) {
  res.status(404).json({
    error: true,
    message: `the route ${req.method} ${req.url} is not found`,
  });
};

module.exports = notFoundMiddleware;

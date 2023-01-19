const { BadRequest } = require("../error/errorClass");
const fs = require("fs");
const validateCreate = function (req, res, next) {
  let errors = [];

  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new BadRequest("req.body undefined or empty"));
  }
  const { name, description, price } = req.body;
  if (!req.file) {
    errors.push({
      name: "image",
      message: "image file is required",
    });
  }
  if (isEmpty(name)) {
    errors.push({
      name: "name",
      message: "name is required",
    });
  }
  if (isEmpty(description)) {
    errors.push({
      name: "description",
      message: "description is required",
    });
  }
  if (isEmpty(price)) {
    errors.push({
      name: "price",
      message: "price is required",
    });
  }
  if (!isEmpty(price) && price < 10) {
    errors.push({
      name: "price",
      message: "price should not be less than 10",
    });
  }
  if (errors.length > 0) {
    if (req.file) {
      removeImage(req.file.path);
    }
    return res.status(400).json({
      error: true,
      errors: {
        type: "validationError",
        errors,
      },
    });
  }

  req.body.image = req.file.path;
  next();
};

const validateUpdate = function (req, res, next) {
  let nOfFields = 0;
  if (req.file) {
    req.body.image = req.file.path;
    nOfFields++;
  }
  const { name, description, price } = req.body;
  if (
    isEmpty(name) &&
    isEmpty(price) &&
    isEmpty(description) &&
    nOfFields === 0
  ) {
    return next(new BadRequest("send at least one field"));
  }
  if (price < 10) {
    removeImage(req.file.path);
    return next(new BadRequest("price should not be less than 10"));
  }
  next();
};

module.exports = {
  validateCreate,
  validateUpdate,
};

function isEmpty(params) {
  return !params || !params.trim();
}
function removeImage(path) {
  fs.rm(path, function (err) {
    if (err) console.log(err);
  });
}

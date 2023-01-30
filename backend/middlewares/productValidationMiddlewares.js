const { BadRequest } = require("../error/errorClass");
const formidable = require("formidable");
const fs = require("fs");
const validateCreate = function (req, res, next) {
  let errors = [];
  const form = formidable({ multiples: false });
  form.parse(req, (err, fields, files) => {
    if (err) {
      return next(err);
    }
    let image = files.image;

    const { name, description, price } = fields;
    if (!image) {
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
      return res.status(400).json({
        error: true,
        errors: {
          type: "validationError",
          errors,
        },
      });
    }
    req.body = { ...fields, image };
    next();
  });
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

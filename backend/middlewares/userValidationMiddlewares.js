const validateSignup = function (req, res, next) {
  const { name, email, password } = req.body;
  const errors = [];

  if (isEmpty(name)) {
    errors.push({
      field: "name",
      message: "name is required",
    });
  }
  if (isEmpty(email)) {
    errors.push({
      field: "email",
      message: "email is required",
    });
  }
  if (!isEmpty(email) && !/.+\@.+\..+/g.test(email)) {
    errors.push({
      field: "email",
      message: "invalid email",
    });
  }
  if (isEmpty(password)) {
    errors.push({
      field: "password",
      message: "password is required",
    });
  }
  if (!isEmpty(password) && password.trim().length < 8) {
    errors.push({
      field: "password",
      message: "password should be 8 characters at least",
    });
  }

  if (errors.length > 0)
    return res.status(400).json({
      type: "validationError",
      errors,
    });

  next();
};
const validateLogin = function (req, res, next) {
  const { email, password } = req.body;
  const errors = [];

  if (isEmpty(email)) {
    errors.push({
      field: "email",
      message: "email is required",
    });
  }
  if (!isEmpty(email) && !/.+\@.+\..+/g.test(email)) {
    errors.push({
      field: "email",
      message: "invalid email",
    });
  }
  if (isEmpty(password)) {
    errors.push({
      field: "password",
      message: "password is required",
    });
  }
  if (!isEmpty(password) && password.trim().length < 8) {
    errors.push({
      field: "password",
      message: "password should be 8 characters at least",
    });
  }
  if (errors.length > 0)
    return res.status(400).json({
      type: "validationError",
      errors,
    });

  next();
};
module.exports = {
  validateSignup,
  validateLogin,
};

function isEmpty(field) {
  return !field || !field.trim();
}

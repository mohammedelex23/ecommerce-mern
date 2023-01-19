function isEmpty(field) {
  return !field || !field.trim();
}

const validateEmail = function (email) {
  if (isEmpty(email)) {
    return { error: true, message: "Email is empty" };
  }
  if (!/.+\@.+\..+/g.test(email)) {
    return { error: true, message: "invalid email" };
  }
  return { error: false };
};
const validateName = function (name) {
  if (isEmpty(name)) {
    return { error: true, message: "name is empty" };
  }
  return { error: false };
};
const validatePassword = function (password) {
  if (isEmpty(password)) {
    return { error: true, message: "password is empty" };
  }
  if (!isEmpty(password) && password.trim().length < 8) {
    return { error: true, message: "password less than 8 characters" };
  }
  return { error: false };
};
const validateConfirmPassword = function (password, confirmPassword) {
  let { error } = validatePassword(password);

  if (!error && password !== confirmPassword)
    return { error: true, message: "passwords don't match" };
  return { error: false };
};
export default {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateName,
};

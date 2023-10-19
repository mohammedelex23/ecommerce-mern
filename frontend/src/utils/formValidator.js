function isEmpty(value) {
  return !value || !value.trim();
}

const validateEmail = function (email) {
  if (isEmpty(email)) {
    return { error: true, message: "email is empty" };
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
const validateState = function (state) {
  if (isEmpty(state)) {
    return { error: true, message: "state is empty" };
  }
  return { error: false };
};
const validateCity = function (city) {
  if (isEmpty(city)) {
    return { error: true, message: "city is empty" };
  }
  return { error: false };
};
const validatePhone = function (phone) {
  if (isEmpty(phone)) {
    return { error: true, message: "phone is empty" };
  }
  return { error: false };
};
const validatePrice = function (price) {
  if (isEmpty(price)) {
    return { error: true, message: "price is not selected" };
  }
  if (parseInt(price) <= 0) {
    return { error: true, message: "price should be greater than 0" };
  }
  return { error: false };
};
const validateFormField = function (field, value) {
  if (isEmpty(value)) {
    return { error: true, message: field + " is empty" };
  } else if (["password", "newPassword"].includes(field)) {
    if (!isEmpty(value) && value.trim().length < 8) {
      return { error: true, message: "password less than 8 characters" };
    }
  }
  return { error: false };
};
const validateImage = function (image) {
  let types = ["image/png", "image/jpg", "image/jpeg"];
  if (!image) {
    return { error: true, message: "choose an image file" };
  }
  if (!types.includes(image.type)) {
    return { error: true, message: "should be png, jpeg or jpg" };
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

  if (!error && password !== confirmPassword) {
    return { error: true, message: "passwords don't match" };
  } else {
    return { error: false };
  }
};
export default {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateName,
  validateFormField,
  validatePrice,
  validateImage,
  validateCity,
  validateState,
  validatePhone,
};

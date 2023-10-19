import jwt_decode from "jwt-decode";
const getLocalUser = function () {
  let user = localStorage.getItem("user");
  if (!user) return null;
  return JSON.parse(user);
};

const isAuthenticated = function () {
  return !!getLocalUser();
};
const isUserVerified = function () {
  let user = getLocalUser();
  return user?.isVerified || false;
};

const authenticateUser = function (user) {
  localStorage.setItem("user", JSON.stringify(user));
};
const updateLocalUser = function (newUser) {
  let oldUser = getLocalUser();
  newUser["token"] = oldUser.token;
  localStorage.setItem("user", JSON.stringify(newUser));
};

const getToken = function () {
  let user = getLocalUser();
  if (!user) return null;
  return user.token;
};
const logout = function () {
  localStorage.removeItem("user");
  localStorage.removeItem("cart");
};

const isLoggedIn = function () {
  try {
    let token = getToken();
    if (!token) {
      return false;
    }
    let decoded = jwt_decode(token);
    let token_exp = decoded.exp * 1000;
    if (token_exp - 1000 * 60 * 2 >= Date.now()) {
      //token has 2 minutes left to expire: it is still valid
      return true;
    }
    logout();
    return false;
  } catch (error) {
    logout();
    return false;
  }
};

export default {
  isAuthenticated,
  getLocalUser,
  authenticateUser,
  getToken,
  logout,
  isUserVerified,
  isLoggedIn,
  updateLocalUser,
};

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
const getToken = function () {
  let user = getLocalUser();
  if (!user) return null;
  return user.token;
};
const logout = function () {
  localStorage.removeItem("user");
  localStorage.removeItem("cart");
};

export default {
  isAuthenticated,
  getLocalUser,
  authenticateUser,
  getToken,
  logout,
  isUserVerified,
};

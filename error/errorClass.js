class GeneralError extends Error {
  constructor(message, name, code = 500) {
    super(message);
    this.code = code;
    this.name = name;
  }
}

class NotFound extends GeneralError {
  constructor(message) {
    super(message, 404);
  }
}

class BadRequest extends GeneralError {
  constructor(message,name) {
    super(message,name, 400);
  }
}

class UnAuthenticated extends GeneralError {
  constructor(message, name) {
    super(message, name, 401);
  }
}

class UnAuthorized extends GeneralError {
  constructor(message, name) {
    super(message, name, 403);
  }
}
class Conflict extends GeneralError {
  constructor(message, name) {
    super(message, name, 409);
  }
}

module.exports = {
  GeneralError,
  NotFound,
  UnAuthenticated,
  BadRequest,
  UnAuthorized,
  Conflict,
};

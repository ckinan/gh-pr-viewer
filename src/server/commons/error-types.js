exports.AuthorizationError = class extends Error {
  constructor(args) {
    super(args);
    this.name = 'AuthorizationError';
    this.code = 401;
    this.message = 'Unauthorized';
  }
};

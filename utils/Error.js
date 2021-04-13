class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message
    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperationalError = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
exports.AppError = AppError
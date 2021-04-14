const dotenv = require('dotenv').config();
const { AppError } = require('../utils/Error.js');
const mongoose = require('mongoose');


var routeNotFound = (err) => {
  var message = err.message;
  return new AppError(message, 404);
};
var castObjectID = (err) => {
  var message = `${err.value} is an invalid ${err.path}`;
  return new AppError(message, 400);
};
var validationErrors = (err) => {
  var message = `${err.message}`;
  return new AppError(message, 400);
};
var handleJWTError = (err) => {
  return new AppError('Invalid Token. Please login again', 401);
};
var handleJWTExpityError = (err) => {
  return new AppError(' Token Expired. Please login again', 401);
};

var sendErrorDev = (err, request, response) => {
  console.log('Error somewhere in errorController');
  if (request.originalUrl.startsWith('/api')) {
    return response.status(err.statusCode).json({
      status: err.status,
      error: err,
      statusCode: err.statusCode,
      message: err.message,
      stack: err.stack,
    });
  } else {
    return response.status(err.statusCode).render('error', {
      title: 'Something went very wrong',
      msg: err.message,
    });
  }
};

var sendErrorProd = (err, request, response) => {
  if (request.originalUrl.startsWith('/api')) {
    if (err.isOperationalError) {
      return response.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      console.error('ERROR 🔥🔥', err);

      return response.status(500).json({
        status: 'error',
        message: 'Something went very wrong!',
        messageError: err.message,
      });
    }
  } else {
    if (err.isOperationalError) {
      return response.status(err.statusCode).render('error', {
        title: 'Something went very wrong',
        msg: err.message,
      });
    } else {
      console.error('ERROR 🔥🔥', err);

      return response.status(err.statusCode).render('error', {
        title: 'Something went very wrong',
        msg: 'Please try again later',
      });
    }
  }
};

module.exports = (err, request, response, next) => {
  console.log('inside error handler');
  if (err.message.includes(`route ${request.originalUrl} not found`)) {
    return response.status(err.statusCode).json({
      statusCode: err.statusCode,
      status: err.status,
      message: err.message,
    });
  }

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'ERROR STATUS NOT DEFINED IN APPLICATION';
  var error = {
    ...err,
  };

  if (process.env.NODE_ENV == 'development') {
    return sendErrorDev(err, request, response);
  }

  if (process.env.NODE_ENV == 'production') {
    if (err.name == 'JsonWebTokenError') {
      error = handleJWTError(err);
    }
    if (err.name == 'TokenExpiredError') {
      error = handleJWTExpityError(err);
    }

    return sendErrorProd(err, request, response);
  }
  sendErrorProd(err, response);
};

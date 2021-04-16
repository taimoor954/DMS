const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { AppError } = require('../utils/Error');
const path = require('path');
const configDIR = path.join(__dirname, '../config.env');
dotenv.config({ path: configDIR });

exports.protectedRouteMiddleware = (Model) =>
  catchAsync(async (request, response, next) => {
    let token;

    if (
      request.headers.authorization &&
      request.headers.authorization.startsWith('Bearer')
    ) {
      token = request.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return next(new AppError('You are not logged in .Please log in', 401));
    }

    const decodedToken = await jwt.verify(
      token,
      process.env.SECRET_TOKEN_STRING
    );

    const freshUser = await Model.findById(decodedToken.id);
    if (!freshUser)
      return next(
        new AppError('The user belonging to this token is no longer exist', 401)
      );

    request.user = freshUser;

    next();
  });

exports.restrictUser = (...roles) => {
  return (request, response, next) => {
    if (!roles.includes(request.user.role)) {
      return next(
        new AppError('You do not have permisson to perform this action', 403)
      );
    }
    next();
  };
};

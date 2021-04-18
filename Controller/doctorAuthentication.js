const { response } = require('express');
const validator = require('validator');
const dotenv = require('dotenv');
const { AppError } = require('../utils/Error');
const { Doctor } = require('../Model/doctorModel');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const path = require('path');
const {  login, protectRouteMiddleware } = require('../middleware/middleware');
const configDIR = path.join(__dirname, '../config.env');

dotenv.config({ path: configDIR });

exports.login = login(Doctor);

exports.protectDoctorRoutes = catchAsync(async (request, response, next) => {
  let token;
  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith('Bearer')
  ) {
    token = request.headers.authorization.split(' ')[1];
  }else if (request.cookies.jwt) {
    token = request.cookies.jwt;
  }
  
  if (!token) {
    return next(new AppError('You are not logged in .Please log in', 401));
  }

  const decodedToken = await jwt.verify(token, process.env.SECRET_TOKEN_STRING);
  const freshUser = await Doctor.findById(decodedToken.id);
  if (!freshUser)
    return next(
      new AppError('The user belonging to this token is no longer exist', 401)
    );

  request.user = freshUser;
    console.log(request.user);
  next();
});

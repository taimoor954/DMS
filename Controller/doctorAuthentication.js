const { response } = require('express');
const validator = require('validator');
const dotenv = require('dotenv');
const { AppError } = require('../utils/Error');
const { Doctor } = require('../Model/doctorModel');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const path = require('path');
const { protectedRouteMiddleware } = require('../middleware/protectedMiddleware');
const configDIR = path.join(__dirname, '../config.env');

dotenv.config({ path: configDIR });

const tokenGenerator = (id) => {
  return jwt.sign(
    {
      id: id,
    },
    process.env.SECRET_TOKEN_STRING,
    {
      expiresIn: process.env.TOKEN_EXPIRY,
    }
  );
};

exports.login = catchAsync(async (request, response, next) => {
  //Email and password will be fetched from request.body
  var { email, password } = request.body;

  //Check if emall is in correct format
  if (!validator.isEmail(email)) {
    return next(
      new AppError('Something wrong with either email or password', 400)
    );
  }

  //Check if any user exist with this email
  const doctor = await Doctor.findOne({ email }).select('+password');
  if (!doctor)
    next(new AppError('Something wrong with either email or password', 400));
  //check password and compare it with hashed password
  if (!doctor || !(await doctor.matchPassword(doctor.password, password))) {
    return next(
      new AppError('Something wrong with either email or password', 400)
    );
  }
  // console.log(request.headers);
  //if correct then send jwt in response
  return response.status(200).json({
    success: 'Succesfully logged in!!',
    doctor,
    token: tokenGenerator(doctor._id),
  });
});

exports.protectedRouteMiddleware = protectedRouteMiddleware(Doctor)


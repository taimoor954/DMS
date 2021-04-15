const { response } = require('express');
const validator = require('validator');
const dotenv = require('dotenv');
const { AppError } = require('../utils/Error');
const { Doctor } = require('../Model/doctorModel');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const path = require('path');
const configDIR = path.join(__dirname, '../config.env');

dotenv.config({ path: configDIR });
console.log(process.env.SECRET_TOKEN_STRING);

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

exports.protectedRouteMiddleware = catchAsync(
  async (request, response, next) => {
    let token;
    //GET TOKEN FROM HEADER (FOR DEVELOPMENT PURPOSE JUST)
    if (
      request.headers.authorization &&
      request.headers.authorization.startsWith('Bearer')
    ) {
      token = request.headers.authorization.split(' ')[1]; //split and get seocnd elemet
    }
    if (!token) {
      return next(new AppError('You are not logged in .Please log in', 401));
    }

    //CHECK IF TOKEN IS FINE
    const decodedToken = await jwt.verify(
      token,
      process.env.SECRET_TOKEN_STRING
    ); // the above one ant this one both return promise
    //CHECK IF USER CONTAINING THIS TOKEN STILL EXIST
    const freshUser = await Doctor.findById(decodedToken.id);
    if (!freshUser)
      return next(
        new AppError('The user belonging to this token is no longer exist', 401)
      );
    //GRANT ACCESS IF IT ACCESS
    request.doctor = freshUser;

    next();
  }
);

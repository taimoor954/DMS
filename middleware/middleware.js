const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const validator = require('validator');

const { AppError } = require('../utils/Error');
const path = require('path');
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
exports.login = (Model) =>  catchAsync(async (request, response, next) => {
  //Email and password will be fetched from request.body
  var { email, password } = request.body;

  //Check if emall is in correct format
  if (!validator.isEmail(email)) {
    return next(
      new AppError('Something wrong with either email or password', 400)
    );
  }

  //Check if any user exist with this email
  const doctor = await Model.findOne({ email }).select('+password');
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

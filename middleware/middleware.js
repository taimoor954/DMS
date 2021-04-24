const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const validator = require('validator');

const { AppError } = require('../utils/Error');
const path = require('path');
const { Patient } = require('../Model/patientModel');
const configDIR = path.join(__dirname, '../config.env');
dotenv.config({ path: configDIR });

const createSendToken = (user, statusCode, request, response) => {
  //for login and sending token
  const token = tokenGenerator(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRY_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    path: '/',
    secure: request.secure || request.headers['x-forwarded-proto'] == 'https',
    SameSite:"none"
  };

  // if (process.env.NODE_ENV == 'production') cookieOptions.secure = true; //FOR DEV
  if (request.secure || request.headers['x-forwarded-proto'] == 'https') cookieOptions.secure = true; //for prod HEROKU SPECFIC
  response.cookie('jwt', token, cookieOptions);
  user.password = undefined;
  response.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

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
exports.login = (Model) =>
  catchAsync(async (request, response, next) => {
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
    createSendToken(doctor, 200, request, response);
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


//FOR LOG OUT 
exports.logout = (request, response) => {
  response.cookie('jwt', 'loggedOut', {
    expires: new Date(Date.now() + 10 * 1000), //tampered token will be given for 10 seconds and then the user will be logged out
    httpOnly: true,
  });
  response.status(200).json({
    status: 'succesfully loggedout',
  });
};

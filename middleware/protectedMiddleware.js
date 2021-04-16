const catchAsync = require("../utils/catchAsync");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { AppError } = require('../utils/Error');
const path = require('path');
const configDIR = path.join(__dirname, '../config.env');
dotenv.config({ path: configDIR });

exports.protectedRouteMiddleware = (Model) =>
  catchAsync(async (request, response, next) => {
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
    const freshUser = await Model.findById(decodedToken.id);
    if (!freshUser)
      return next(
        new AppError('The user belonging to this token is no longer exist', 401)
      );
    //GRANT ACCESS IF IT ACCESS
    if(freshUser.role == "doctor")   request.doctor = freshUser;
    else if(freshUser.role == 'patient') request.patient = freshUser
  

    next();
  });

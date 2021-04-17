const { response } = require('express');
const validator = require('validator');
const dotenv = require('dotenv');
const { AppError } = require('../utils/Error');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const path = require('path');
const { protectedRouteMiddleware, login } = require('../middleware/middleware');
const { Patient } = require('../Model/PatientModel');
const configDIR = path.join(__dirname, '../config.env');

dotenv.config({ path: configDIR });


exports.login = login(Patient)

exports.protectedRouteMiddlewareForPatients = protectedRouteMiddleware(Patient)


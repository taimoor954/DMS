const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const { doctorRouter } = require('./Routes/doctorRoutes.js');
const { patientRouter } = require('./Routes/patientRoutes.js');
const { appointmentRouter } = require('./Routes/appointmentRoutes');

const globalErrorHandeler = require('./Controller/errorController.js');
const { AppError } = require('./utils/Error.js');

const app = express();

//Set every application request and response header's content type to json format
app.use(function (request, response, next) {
  request.headers['Content-Type'] = 'application/json';
  response.setHeader('Content-Type', 'application/json');
  next();
});

//BODY PARSER
app.use(
  express.json({
    limit: '10kb', //size of req.body can be upto 10kb
  })
);

//EXPRESS REQUEST RESPONSE CONFIGURATION
app.use(
  express.urlencoded({
    extended: true,
    limit: '10kb',
  })
);

//ROUTES HANDLER MIDDLEWARE
app.use('/api/v1/doctor', doctorRouter);
app.use('/api/v1/patient', patientRouter);
app.use('/api/v1/appointment', appointmentRouter);

//ERROR HANDLER FOR ROUTE NOT FOUND
app.all('*', (request, response, next) => {
  next(new AppError(`route ${request.originalUrl} not found`, 404));
});

//GLOBAL ERROR CONTROLLER
app.use(globalErrorHandeler);

exports.app = app;

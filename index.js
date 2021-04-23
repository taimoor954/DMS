const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors')
const morgan = require('morgan') //for production log purpose
const cookie_parser = require('cookie-parser');
const compression = require('compression')
const helmet = require('helmet');
const app = express();
app.use(cors())


const { doctorRouter } = require('./Routes/doctorRoutes.js');
const { patientRouter } = require('./Routes/patientRoutes.js');
const { appointmentRouter } = require('./Routes/appointmentRoutes');
const { adminRouter } = require('./Routes/adminRoutes');

const globalErrorHandeler = require('./Controller/errorController.js');
const { AppError } = require('./utils/Error.js');

app.enable('trust proxy')
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
); //SECURITY GLOBAL MIDDLEWARE THAT SET SECUTIRTY HTTP

app.use(cookie_parser());


app.use(compression()) //compress all the text sent to client
//Set every application request and response header's content type to json format
app.use(function (request, response, next) {
  request.headers['Content-Type'] = 'application/json';
  response.setHeader('Content-Type', 'application/json');
  next();
});

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,content-type,set-cookie'
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

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

var date = new Date()

//ROUTES HANDLER MIDDLEWARE
app.use('/api/v1/doctor', doctorRouter);
app.use('/api/v1/patient', patientRouter);
app.use('/api/v1/appointment', appointmentRouter);
app.use('/api/v1/admin', adminRouter);

//ERROR HANDLER FOR ROUTE NOT FOUND
app.all('*', (request, response, next) => {
  next(new AppError(`route ${request.originalUrl} not found`, 404));
});

//GLOBAL ERROR CONTROLLER
app.use(globalErrorHandeler);

exports.app = app;


// dms.com/api/v1/doctor //Get all Doctors


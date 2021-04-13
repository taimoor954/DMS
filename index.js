const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const { doctorRouter } = require('./Routes/doctorRoutes.js');
const { patientRouter } = require('./Routes/patientRoutes.js');
const { appointmentRouter } = require('./Routes/appointmentRoutes');

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

//CONFIG SERCRETS FROM config.env FILE
dotenv.config({
  path: `${__dirname}/config.env`,
});

//CONNECTION STRING FOR CLOUD DB
const DB = process.env.DATABASE_ATLAS.replace(
  '<PASSWORD>',
  process.env.DATABASE_ATLAS_PASSWORD
);

//CONNECTION STRING FOR LOCAL DB
const DBLocal = process.env.DATABASE_LOCAL;
//MONGO DB CONNECTION
const getMongoConnection = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
    console.log(`Database has been connected!.....`);
  } catch (error) {
    console.log(`Error:${error}`);
    console.log('APPLICATION CRASHEDD 🔥🔥');
    process.exit(1);
  }
};
getMongoConnection();

//ROUTES HANDLER MIDDLEWARE
app.use('/api/v1/doctor', doctorRouter);
app.use('/api/v1/patient', patientRouter);
app.use('/api/v1/appointment', appointmentRouter);

//SERVER LISTENING
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});


const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const {doctorRouter} = require('./Routes/doctorRoutes.js')
const {patientRouter} = require('./Routes/patientRoutes.js')

const app = express();
//CONFIG SERCRETS FROM config.env FILE
dotenv.config({
  path: `${__dirname}/config.env`,
});

//MONGO DB CONNECTION
const DB = process.env.DATABASE_LOCAL;
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
    console.log(error);
  }
};
getMongoConnection();

app.use('/api/v1/doctor', doctorRouter)
app.use('/api/v1/patient', patientRouter)


//SERVER LISTENING  
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening at port.... ${port}`);
});

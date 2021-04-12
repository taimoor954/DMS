const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
dotenv.config({
  path: `${__dirname}/config.env`,
});
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

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening at port.... ${port}`);
});

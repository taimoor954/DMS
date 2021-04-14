const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//TO CATCH UNCAUGH EXCEPTION AND SHOW THEM IN CONSOLE
process.on('uncaughtException', (e) => {
  console.log(`Error: ${e.name}!! ${e.message}`);
});
const { app } = require('./index');

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

//SERVER LISTENING
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});

//UNHANDELED REJECTIONS
process.on('unhandledRejection', (e) => {
  //handle uncaught rejections or async code
  console.log(`Error: ${e.name}!! ${e.message}`);
  server.close(() => {
    process.exit(1);
  });
});

// process.on('SIGTERM', () => { //HEROKU SPECIFIC shut down server but complete all requsst before shutting down
//   console.log('SIG TERM RECIVED.... SHUTTING DOWN GRACEFULLY 🥳😇')
//   server.close(() => {
//     console.log('Process Terminated ☠ ☠')
//   })
// })

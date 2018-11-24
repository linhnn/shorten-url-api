const app = require('./config/tiki');

app.start()
  .then(() => {
    tiki.log.bold(`/*************************************
 * Tiki Shorten Url - NodeJs            *
 * Environment: ${process.env.NODE_ENV}             *
 * Server is running on port: ${process.env.server_port}      *
  **************************************/`);
  })
  .catch((error) => {
    tiki.log.error('Error when boottraping application');
    tiki.log.error(error);
  });

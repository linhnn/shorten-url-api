const mongoose = require('mongoose');
const Url = require('../app/models/Url');
const Subscribe = require('../app/models/Subscribe');

module.exports.connect = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.mongoUri, { useMongoClient: true });
  mongoose.connection.on('error', () => {
    throw new Error('Mongodb Connection Error!');
  });
};

module.exports.globalAllModels = () => {
  global.Url = Url;
  global.Subscribe = Subscribe;
};

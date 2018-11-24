/* eslint-disable */
const should = require('should');
const chai = require('chai');
const { expect } = chai;

const app = require('./../config/tiki.js');

before(async () => {
  process.env.test_port = 3002;
  if (process.env.NODE_ENV === 'travis') {
    process.env.mongoUri = `${process.env.mongoUri_travis}-test`;
  } else {
    process.env.mongoUri = `${process.env.mongoUri}-test`;    
  }
  global.graphqlUrl = `http://localhost:${process.env.test_port}/graphql`;
  await app.start();
  await Url.remove({});
  await Subscribe.remove({});
});

after(async () => {
  await app.close();
})

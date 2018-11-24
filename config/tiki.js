/** Load modules */
const express = require('express');
const cors = require('cors');
const graphQLHttp = require('express-graphql');
const { formatError } = require('apollo-errors');
const expressPlayground = require('graphql-playground-middleware-express').default;
const log = require('./log');
const database = require('./database');
const errors = require('./error/errors');
const error = require('./error/error');
const services = require('./services');
const repositories = require('./repositories');

/** GraphQL */
const graphQLSchema = require('./../app/graphql');

/** Init server */
let server;
const app = express();
app.use(cors('*'));

/** Load config */
require('dotenv').config();

module.exports = {
  async start() {
    /** Global Param */
    global.tiki = {};

    /** Log */
    tiki.log = log;

    /** Errors */
    tiki.errors = errors;
    tiki.error = error;

    /** Service */
    tiki.service = services;

    /** Repository */
    tiki.repo = repositories;

    /** Connect to MongoDB */
    database.connect();
    database.globalAllModels();

    /** Cronjob */
    if (!process.env.test_port) {
      const checkUrlWeek = require('./cron');
      checkUrlWeek.cronJob;
    }

    /** Start GraphQL Server */
    app.use('/graphql', graphQLHttp({
      schema: graphQLSchema,
      graphiql: true,
      formatError,
    }));
    app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

    /** Start Server */
    const PORT = process.env.test_port || process.env.server_port || 3001;
    server = app.listen(PORT);
  },

  async close() {
    server.close();
  },
};

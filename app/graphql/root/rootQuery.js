const { GraphQLObjectType } = require('graphql');

const urlQueries = require('../queries/urlQuery');

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    ...urlQueries,
  },
});

module.exports = RootQuery;

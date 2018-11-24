const { GraphQLSchema } = require('graphql');

const RootQuery = require('./root/rootQuery');
const RootMutation = require('./root/rootMutation');

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

module.exports = schema;

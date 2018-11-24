const { GraphQLObjectType } = require('graphql');

const shortenLink = require('../mutations/shortenLink');
const subscribeEmail = require('../mutations/subscribeEmail');

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    shortenLink,
    subscribeEmail,
  },
});

module.exports = RootMutation;

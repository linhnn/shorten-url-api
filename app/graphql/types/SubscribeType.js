const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} = require('graphql');
const DateType = require('./DateType');

const SubscribeType = new GraphQLObjectType({
  name: 'SubscirbeType',
  description: 'Trả về URL của người dùng',
  fields: {
    id: {
      type: GraphQLID,
      description: 'Url Id',
    },
    email: {
      type: GraphQLString,
      description: 'Email',
    },
    createdAt: {
      type: DateType,
    },
    updatedAt: {
      type: DateType,
    },
  },
});

module.exports = SubscribeType;

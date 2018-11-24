const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} = require('graphql');
const DateType = require('./DateType');

const UrlType = new GraphQLObjectType({
  name: 'UrlType',
  description: 'Trả về URL của người dùng',
  fields: {
    id: {
      type: GraphQLID,
      description: 'Url Id',
    },
    originalUrl: {
      type: GraphQLString,
      description: 'URL ban đầu',
    },
    urlCode: {
      type: GraphQLString,
      description: 'URL code',
    },
    shortUrl: {
      type: GraphQLString,
      description: 'URL đã thu gọn',
    },
    title: {
      type: GraphQLString,
      description: 'Title',
    },
    count: {
      type: GraphQLInt,
      description: 'Số lần URL được truy cập',
    },
    createdAt: {
      type: DateType,
    },
    updatedAt: {
      type: DateType,
    },
  },
});

module.exports = UrlType;

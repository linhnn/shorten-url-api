const {
  GraphQLScalarType,
} = require('graphql');
const moment = require('moment');

const DateType = new GraphQLScalarType({
  name: 'DateType',
  description: 'Thời gian, trả về dưới định dạng DD-MM-YYYY H:ss',
  serialize(value) {
    return moment(value).format('DD-MM-YYYY HH:mm:ss');
  },
});

module.exports = DateType;

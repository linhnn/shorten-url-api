const {
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');
const SubscribeType = require('../types/SubscribeType');
const { isValidEmail } = require('../../utils/string');

module.exports = {
  type: SubscribeType,
  description: 'Subscirbe Email',
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Email',
    },
  },
  async resolve(root, { email }) {
    try {
      // check email
      if (!isValidEmail(email)) {
        return tiki.error(tiki.errors.emailNotValid);
      }

      // check subscriber
      const subscribe = await Subscribe.findOne({ email });
      if (subscribe) {
        return subscribe;
      }

      return await Subscribe.create({ email });
    } catch (error) {
      tiki.log.error(error);
      throw error;
    }
  },
};

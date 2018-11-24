const assert = require('assert');
const { createError } = require('apollo-errors');

module.exports = (errorName, data = {}) => {
  assert(errorName, 'bap.error - Require error name');

  const GraphQLError = createError({
    message: errorName.message,
    code: errorName.code,
  }, {
    message: errorName.message,
  });

  return new GraphQLError({ data });
};

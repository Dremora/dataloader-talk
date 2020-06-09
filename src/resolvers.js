const { query, sql } = require("./database");
const { orderByKeys, orderAndGroupByKeys, onNextTick } = require("./utils");

exports.resolvers = {
  Query: {
    albums: async () => {
      return [];
    },
  },
};

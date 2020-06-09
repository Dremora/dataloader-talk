const { ApolloServer } = require("apollo-server");

const { resolvers, context } = require("./resolvers");
const { typeDefs } = require("./schema");

const server = new ApolloServer({ typeDefs, resolvers, context });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

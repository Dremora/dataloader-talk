const { ApolloServer } = require("apollo-server");

const { resolvers: resolversNaive } = require("./resolvers-naive");
const { resolvers: resolversStandalone } = require("./resolvers-standalone");
const { typeDefs } = require("./schema");

const server = new ApolloServer({
  typeDefs,
  resolvers: resolversStandalone,
  tracing: true,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

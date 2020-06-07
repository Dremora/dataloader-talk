const { ApolloServer } = require("apollo-server");

const { resolvers: resolversNaive } = require("./resolvers-naive");
const { typeDefs } = require("./schema");

const server = new ApolloServer({
  typeDefs,
  resolvers: resolversNaive,
  tracing: true,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

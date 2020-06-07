const { ApolloServer } = require("apollo-server");

const { resolvers: resolversNaive } = require("./resolvers-naive");
const { resolvers: resolversStandalone } = require("./resolvers-standalone");
const {
  resolvers: resolversOptimized,
  context,
} = require("./resolvers-optimized");
const { typeDefs } = require("./schema");

const resolvers =
  process.env.RESOLVERS === "NAIVE"
    ? resolversNaive
    : process.env.RESOLVERS === "STANDALONE"
    ? resolversStandalone
    : resolversOptimized;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  tracing: true,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

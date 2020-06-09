const { ApolloServer } = require("apollo-server");

const { resolvers: resolversGreedy } = require("./resolvers-greedy");
const { resolvers: resolversLazy } = require("./resolvers-lazy");
const {
  resolvers: resolversOptimized,
  context,
} = require("./resolvers-optimized");
const { typeDefs } = require("../schema");

const resolvers =
  process.env.RESOLVERS === "GREEDY"
    ? resolversGreedy
    : process.env.RESOLVERS === "LAZY"
    ? resolversLazy
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

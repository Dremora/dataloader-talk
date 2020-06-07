const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    albums: [Album!]!
  }

  type Album {
    artist: Artist!
    title: String!
    tracks: [Track!]!
    year: Int!
  }

  type Artist {
    name: String!
  }

  type Track {
    index: Int!
    title: String!
  }
`;

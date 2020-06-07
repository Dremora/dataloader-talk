const { query, sql } = require("./database");

exports.resolvers = {
  Query: {
    albums: async () => {
      const albums = await query(sql`select * from albums`);

      return albums;
    },
  },

  Album: {
    artist: async (album) => {
      const artists = await query(
        sql`select * from artists WHERE id = ${album.artist_id}`
      );
      return artists[0];
    },

    tracks: async (album) => {
      const tracks = await query(
        sql`select * from tracks WHERE album_id = ${album.id} ORDER BY index`
      );
      return tracks;
    },
  },
};

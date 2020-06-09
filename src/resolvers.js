const { query, sql } = require("./database");
const { orderByKeys, orderAndGroupByKeys, onNextTick } = require("./utils");

async function fetchArtistsByIDs(artistIDs) {
  const artists = await query(
    sql`select * from artists where id = ANY(${artistIDs})`
  );

  return orderByKeys(artists, artistIDs, (a) => a.id);
}

async function fetchTracksByAlumIDs(albumIDs) {
  const tracks = await query(
    sql`select * from tracks where album_id = ANY(${albumIDs}) ORDER BY index`
  );

  return orderAndGroupByKeys(tracks, albumIDs, (t) => t.album_id);
}

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

const { query, sql } = require("./database");
const { orderByKeys, orderAndGroupByKeys } = require("./utils");

async function fetchArtistsByIDs(artistIDs) {
  const artists = await query(
    sql`select * from artists where id = ANY(${artistIDs})`
  );

  return orderByKeys(artists, artistIDs, (a) => a.id);
}

exports.fetchArtistsByIDs = fetchArtistsByIDs;

async function fetchTracksByAlumIDs(albumIDs) {
  const tracks = await query(
    sql`select * from tracks where album_id = ANY(${albumIDs}) ORDER BY index`
  );

  return orderAndGroupByKeys(tracks, albumIDs, (t) => t.album_id);
}

exports.fetchTracksByAlumIDs = fetchTracksByAlumIDs;

exports.resolvers = {
  Query: {
    albums: async () => {
      const albums = await query(sql`select * from albums`);

      const artistIDs = albums.map(({ artist_id }) => artist_id);
      const artistsById = await fetchArtistsByIDs(artistIDs);
      albums.forEach((album, index) => {
        album.artist = artistsById[index];
      });

      const albumIDs = albums.map(({ id }) => id);
      const tracksByAlbumId = await fetchTracksByAlumIDs(albumIDs);
      albums.forEach((album, index) => {
        album.tracks = tracksByAlbumId[index];
      });

      return albums;
    },
  },
};

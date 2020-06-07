const { query, sql } = require("./database");
const { toMap, groupBy } = require("./utils");

const fetchArtists = async (albums) => {
  const artistIDs = albums.map(({ artist_id }) => artist_id);
  const artists = await query(
    sql`select * from artists where id = ANY(${artistIDs})`
  );

  const artistsById = toMap(artists, (a) => a.id);

  albums.forEach((album) => {
    album.artist = artistsById.get(album.artist_id);
  });
};

const fetchTracks = async (albums) => {
  const albumIDs = albums.map(({ id }) => id);
  const tracks = await query(
    sql`select * from tracks where album_id = ANY(${albumIDs}) ORDER BY index`
  );

  const tracksByAlbumId = groupBy(tracks, (t) => t.album_id);

  albums.forEach((album) => {
    album.tracks = tracksByAlbumId.get(album.id) || [];
  });
};

exports.resolvers = {
  Query: {
    albums: async () => {
      const albums = await query(sql`select * from albums`);

      await fetchArtists(albums);
      await fetchTracks(albums);

      return albums;
    },
  },
};

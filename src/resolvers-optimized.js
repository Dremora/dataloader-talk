const { query, sql } = require("./database");
const { onNextTick } = require("./utils");
const {
  fetchArtistsByIDs,
  fetchTracksByAlumIDs,
} = require("./resolvers-naive");

const Batch = class {
  constructor(runQuery) {
    this.ids = [];
    this.runQuery = runQuery;
  }

  load(id) {
    this.promise =
      this.promise ||
      new Promise((resolve) =>
        onNextTick(async () => {
          resolve(await this.runQuery(this.ids));
          delete this.promise;
        })
      );

    this.ids.push(id);
    return this.promise;
  }
};

module.exports.context = () => ({
  artistsByIDsBatch: new Batch(fetchArtistsByIDs),
  tracksByAlumIDsBatch: new Batch(fetchTracksByAlumIDs),
});

exports.resolvers = {
  Query: {
    albums: async () => {
      const albums = await query(sql`select * from albums`);
      return albums;
    },
  },

  Album: {
    artist: async (album, _, { artistsByIDsBatch }) => {
      const artists = await artistsByIDsBatch.load(album.artist_id);
      return artists.get(album.artist_id);
    },

    tracks: async (album, _, { tracksByAlumIDsBatch }) => {
      const tracks = await tracksByAlumIDsBatch.load(album.id);
      return tracks.get(album.id);
    },
  },
};

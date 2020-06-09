const { query, sql } = require("./database");
const { onNextTick } = require("./utils");
const {
  fetchArtistsByIDs,
  fetchTracksByAlumIDs,
} = require("./resolvers-greedy");

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

    const index = this.ids.length;
    this.ids.push(id);
    return this.promise.then((values) => values[index]);
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
      const artist = await artistsByIDsBatch.load(album.artist_id);
      return artist;
    },

    tracks: async (album, _, { tracksByAlumIDsBatch }) => {
      const tracks = await tracksByAlumIDsBatch.load(album.id);
      return tracks;
    },
  },
};

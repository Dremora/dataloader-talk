export async function seed(knex) {
  await knex("artists").del();
  await knex("artists").insert([
    { id: 1, name: "The Beatles" },
    { id: 2, name: "Romeo Santos" },
  ]);

  await knex("albums").del();
  await knex("albums").insert([
    { id: 1, title: "Revolver", year: 1966, artist_id: 1 },
    {
      id: 2,
      title: "Sgt. Pepper’s Lonely Hearts Club Band",
      year: 1967,
      artist_id: 1,
    },
    { id: 3, title: "Utopía", year: 2019, artist_id: 2 },
  ]);

  await knex("tracks").del();
  await knex("tracks").insert([
    { index: 1, title: "Taxman", album_id: 1 },
    { index: 2, title: "Eleanor Rigby", album_id: 1 },
    { index: 3, title: "I’m Only Sleeping", album_id: 1 },
    { index: 4, title: "Love You To", album_id: 1 },
    { index: 5, title: "Here, There and Everywhere", album_id: 1 },
    { index: 6, title: "Yellow Submarine", album_id: 1 },
    { index: 7, title: "She Said She Said", album_id: 1 },
    { index: 8, title: "Good Day Sunshine", album_id: 1 },
    { index: 9, title: "And Your Bird Can Sing", album_id: 1 },
    { index: 10, title: "For No One", album_id: 1 },
    { index: 11, title: "Doctor Robert", album_id: 1 },
    { index: 12, title: "I Want to Tell You", album_id: 1 },
    { index: 13, title: "Got to Get You Into My Life", album_id: 1 },
    { index: 14, title: "Tomorrow Never Knows", album_id: 1 },

    { index: 1, title: "Sgt. Pepper’s Lonely Hearts Club Band", album_id: 2 },
    { index: 2, title: "With a Little Help From My Friends", album_id: 2 },
    { index: 3, title: "Lucy in the Sky With Diamonds", album_id: 2 },
    { index: 4, title: "Getting Better", album_id: 2 },
    { index: 5, title: "Fixing a Hole", album_id: 2 },
    { index: 6, title: "She’s Leaving Home", album_id: 2 },
    { index: 7, title: "Being for the Benefit of Mr. Kite!", album_id: 2 },
    { index: 8, title: "Within You Without You", album_id: 2 },
    { index: 9, title: "When I’m Sixty‐Four", album_id: 2 },
    { index: 10, title: "Lovely Rita", album_id: 2 },
    { index: 11, title: "Good Morning Good Morning", album_id: 2 },
    {
      index: 12,
      title: "Sgt. Pepper’s Lonely Hearts Club Band (reprise)",
      album_id: 2,
    },
    { index: 13, title: "A Day in the Life", album_id: 2 },

    { index: 1, title: "Intro: Soy dominicano", album_id: 3 },
    { index: 2, title: "Canalla", album_id: 3 },
    { index: 3, title: "Payasos", album_id: 3 },
    { index: 4, title: "La demanda", album_id: 3 },
    { index: 5, title: "Millonario", album_id: 3 },
    { index: 6, title: "El beso que no le di", album_id: 3 },
    { index: 7, title: "Ileso", album_id: 3 },
    { index: 8, title: "Amor enterrado", album_id: 3 },
    { index: 9, title: "Me quedo", album_id: 3 },
    { index: 10, title: "Los últimos", album_id: 3 },
    { index: 11, title: "Años luz", album_id: 3 },
    { index: 12, title: "Bellas", album_id: 3 },
    { index: 13, title: "Inmortal", album_id: 3 },
  ]);
}

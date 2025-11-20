import { Client, TablesDB, ID, Query } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
  .setEndpoint("https://sgp.cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

const database = new TablesDB(client);

export const updateSearchCount = async (searchTerm, movie) => {
  // 1. Use Appwrite SDK to check if the search term exists in the database
  try {
    const result = await database.listRows({
      databaseId: DATABASE_ID,
      tableId: COLLECTION_ID,
      queries: [Query.equal("searchTerm", searchTerm)],
    });
    // console.log(result.rows[0].movie_id);
    // console.log(movie.id);
    // 2. If it does, update the count
    console.log(movie);
    if (movie.id === result?.rows[0]?.movie_id) {
      const doc = result.rows[0];

      await database.incrementRowColumn({
        databaseId: DATABASE_ID,
        tableId: COLLECTION_ID,
        rowId: doc.$id,
        column: "count",
        value: 1,
      });
      // 3. If it doesn't, create a new document with the search term and count as 1
    } else {
      console.log(movie.title);
      await database.createRow({
        databaseId: DATABASE_ID,
        tableId: COLLECTION_ID,
        rowId: ID.unique(),
        data: {
          searchTerm: movie.title,
          count: 1,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          movie_id: movie.id,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

// export const getTrendingMovies = async () => {
//   try {
//     const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
//       Query.limit(5),
//       Query.orderDesc("count"),
//     ]);

//     return result.documents;
//   } catch (error) {
//     console.error(error);
//   }
// };

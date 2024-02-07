const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri = "mongodb://root:password@mongo:27099/";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db('local');
    const movies = database.collection('test1');
    // Query for a movie that has the title 'Back to the Future'
    const query = { useid: '1' };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
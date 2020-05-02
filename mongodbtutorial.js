const {MongoClient} = require('mongodb');

async function main() {
  const uri = 'mongodb+srv://freddieb123:PuraVida1!@cluster0-xel0y.mongodb.net/test?retryWrites=true&w=majority';
  const client = new MongoClient(uri);
  try {
    await client.connect();
    await createListing(
      client,
      {
        name: "Loft",
        summary: " charming"
      }
    );
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }

}

main().catch(console.err)

async function listDatabases(client){
  const databasesList = await client.db().admin().listDatabases();
  console.log(databasesList.databases.forEach(db => console.log(`-${db.name}`)))
}

async function createListing(client, newListing) {
  const result = await client.db('sample_airbnb').collection("listingsAndReviews").insertOne(newListing);
  console.log(result.insertedId)
}

// vikashkumargupta082    username
// Rlz2sLaVGnpsY4tx   password


// mongodb+srv://vikashkumargupta082:Rlz2sLaVGnpsY4tx@shoppercart.ssjpg66.mongodb.net/?retryWrites=true&w=majority&appName=shopperCart



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://vikashkumargupta082:Rlz2sLaVGnpsY4tx@shoppercart.ssjpg66.mongodb.net/?appName=shopperCart";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
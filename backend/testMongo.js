require("dotenv").config();
const { MongoClient } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@covid-watchdog.v8zjb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  mongoTest(client);
});

const mongoTest = async (client) => {
  await client.db("test").collection("test").insertOne({ x: 2 });
  client.close();
};

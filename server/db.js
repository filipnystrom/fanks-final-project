const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.fy2mabq.mongodb.net/fanksFinalProject?retryWrites=true&w=majority`;
// const dbName = 'fanksFinalProject';

async function connectToDb() {
  const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db();

  setTimeout(() => client.close(), 1000);
  return db.collection('journals');
};

async function getJournals() {
  const collection = await connectToDb()  
  return (await collection.find({})).toArray();
}
async function getUser(id) {
  const collection = await connectToDb()
  const result = await collection.find({userId: id}).toArray();
  if(result.length === 0){
    const result1 = (await collection.insertOne({userId: id, entries: []}))
    return result1
  } else {
  return result
  }
}

async function addJournal(journal, id) {
  const collection = await connectToDb()  
  const result = await collection.updateOne(
    {userId: id},
    {$push:{entries: journal}}
  );
  return result.acknowledged && result.modifiedCount ===1
}

async function removeJournal(id,entryId) {
  const collection = await connectToDb()  
  const result = await collection.deleteOne(
    {userId: 'auth0|637de6260d87a4e6f15336c2'},
    {$pull:{entries:{entryId:{$in:['1669321974024']}}}}
  );

  console.log(result,"result")
  return result
}

module.exports = { getJournals, getUser, addJournal, removeJournal };

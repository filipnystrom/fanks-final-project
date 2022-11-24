const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.fy2mabq.mongodb.net/fanksFinalProject?retryWrites=true&w=majority`;
// const dbName = 'fanksFinalProject';

async function connectToJournals() {
  const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db();

  setTimeout(() => client.close(), 1000);
  return db.collection('journals');
};

async function connectToSleepLogs() {
  const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db();

  setTimeout(() => client.close(), 1000);
  return db.collection('sleepLog');
};

async function getJournals() {
  const collection = await connectToJournals();
  return (await collection.find({})).toArray();
}

async function getSleepLogs() {
  const collection = await connectToSleepLogs();
  return (await collection.find({})).toArray();
}

async function addToSleepLogs(newLog, userId) {
  const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db();

  setTimeout(() => client.close(), 1000);
  return db.collection('sleepLog')
              .updateOne({'userId': userId}, {$push: {'entries': newLog}});
};

async function deleteSleepLog(entryId, userId) {
  const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db();


  setTimeout(() => client.close(), 1000);
  console.log('mongodb whatsuuup now?');
  return db.collection('sleepLog')
              .update(
                { 'userId': userId},
                { $pull: { 'entries': { 'entryId': { $in: [entryId]} } } },
              );
};

async function addNewUserSleepLog(newUser) {
  const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db();

  setTimeout(() => client.close(), 1000);
  return db.collection('sleepLog')
              .insertOne(newUser);
};

module.exports = { getJournals, getSleepLogs, addToSleepLogs, deleteSleepLog, addNewUserSleepLog };
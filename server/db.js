const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.fy2mabq.mongodb.net/fanksFinalProject?retryWrites=true&w=majority`;

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
async function getUser(id) {
  const collection = await connectToJournals()
  const result = await collection.find({ userId: id }).toArray();
  if (result.length === 0) {
    const result1 = (await collection.insertOne({ userId: id, entries: [] }))
    return result1
  } else {
    return result
  }
}

async function addJournal(journal, id) {
  const collection = await connectToJournals()
  const result = await collection.updateOne(
    { userId: id },
    { $push: { entries: journal } }
  );
  return result.acknowledged && result.modifiedCount === 1
}

async function removeJournal(id, entryId) {
  const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db();

  console.log(id, entryId, 'whatup', typeof entryId)
  setTimeout(() => client.close(), 1000);
  return db.collection('journals')
    .update(
      { 'userId': id },
      { $pull: { 'entries': { 'entryId': { $in: [entryId] } } } },
    );
  // const collection = await connectToJournals()
  // console.log('heyoooo');
  // return collection.update(
  //   { 'userId': id },
  //   { $pull: { 'entries': { 'entryId': { $in: [entryId] } } } },
  // );

  // console.log(result, "result")
  // return result
}

async function addToSleepLogs(newLog, userId) {
  const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db();

  setTimeout(() => client.close(), 1000);
  return db.collection('sleepLog')
    .updateOne({ 'userId': userId }, { $push: { 'entries': newLog } });
};

async function deleteSleepLog(entryId, userId) {
  const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db();


  setTimeout(() => client.close(), 1000);
  return db.collection('sleepLog')
    .update(
      { 'userId': userId },
      { $pull: { 'entries': { 'entryId': { $in: [entryId] } } } },
    );
};

async function addNewUserSleepLog(newUser) {
  const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db();

  setTimeout(() => client.close(), 1000);
  return db.collection('sleepLog')
    .insertOne(newUser);
};

module.exports = { getJournals, getSleepLogs, addToSleepLogs, deleteSleepLog, addNewUserSleepLog, getUser, addJournal, removeJournal };


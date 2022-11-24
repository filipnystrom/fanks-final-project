const express = require('express');
const cors = require('cors');
const PORT = 8080;
const app = express();
const db = require('./db.js');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app
  .route('/journals')
  .get(async (req, res) => {
    const result = await db.getJournals();
    return res
      .status(200)
      .json(result);
  });

  app
    .route('/sleeplogs/')
    .get(async (_, res) => {
      const result = await db.getSleepLogs();
      return res
        .status(200)
        .json(result);
    });

    app
    .route('/sleeplogs/:userId/')
    .put((req, res) => {
      const { userId } = req.params;
      const newLog = req.body;

      const result = db.addToSleepLogs(newLog, userId);

      return res
        .status(201)
        .json(result);
    })
    .post((req, res) => {
      const newUser = req.body;

      const result = db.addNewUserSleepLog(newUser);

      return res
        .status(201)
        .json(result);
    })
    .delete(async (req, res) => {
      const { entryId, userId } = req.params;

      console.log(userId, entryId);
      const result = db.deleteSleepLog(entryId, userId);
      return res
        .status(204)
        .json(result);
    });

  app
  .listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;
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

    app
    .route('/sleeplogs/:userId/:entryId')
    .delete(async (req, res) => {
      const { entryId, userId } = req.params;

      const result = await db.deleteSleepLog(entryId, userId);
      return res
        .status(204)
        .json(result);
    });

  app
    .route('/journals/:id')
    .get(async (req, res) => {
      const id = 'auth0|'+req.params.id
      const journals = await db.getUser(id)
      return res
        .status(200)
        .json(journals[0]);
    })
    .post(async (req, res) => {
      const id = 'auth0|'+req.params.id
      const journal = req.body
      if(id && journal){
        const result = await db.addJournal(journal, id);
        result ? res.status(201).json({"code":201,"message":"successfully added"}) : 
        res.status(500).json({"code":500,"message":"internal server error"});      
      }else
      res.status(401).json({"code":401,"message":"bad request"});      
    });

  app
    .route('/journals/:id/:entryId/')
    .delete(async (req, res) => {
      const id = 'auth0|'+req.params.id
      const entryId = req.params.entryId
      console.log(id, entryId)
      const result = await db.removeJournal(id, entryId)
      return res 
        .status(204)
        .json(result)
      });

  app
    .listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));

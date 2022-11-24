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
  .route('/journals/:id')
  .get(async (req, res) => {
    const id = 'auth0|'+req.params.id
    const journals = await db.getUser(id)
    return res
      .status(200)
      .json(journals[0]);
  });

  app
  .route('/journals/:id')
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
  .listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));

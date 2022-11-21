const express = require('express');
const cors = require('cors');
const PORT = 8080;
const app = express();
const db = require('./db.js');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app
  .route('/api')
  .get(async (req, res) => {
    const result = await db.getJournals();
    return res
      .status(200)
      .json(result);
  });

  app
  .listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));

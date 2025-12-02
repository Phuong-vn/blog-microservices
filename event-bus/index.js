const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const event = req.body;
  await axios.post('http://localhost:4000/events', { event });
  res.status(200).send('OK');
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});

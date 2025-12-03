const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  await axios.post('http://localhost:4000/events', { event: req.body });
  await axios.post('http://localhost:4001/events', { event: req.body });
  await axios.post('http://localhost:4002/events', { event: req.body });
  await axios.post('http://localhost:4003/events', { event: req.body });
  console.log('Received event:', req.body.type);
  res.status(200).send('OK');
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', async (req, res) => {
  const event = req.body;
  events.push(event);
  await axios.post('http://localhost:4000/events', { event });
  await axios.post('http://localhost:4001/events', { event });
  await axios.post('http://localhost:4002/events', { event });
  await axios.post('http://localhost:4003/events', { event });
  console.log('Received event:', req.body.type);
  res.status(200).send('OK');
});

app.get('/events', (_req, res) => {
  res.status(200).send(events);
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
  const { type, data } = req.body.event;

  switch (type) {
    case 'CommentCreated': {
      setTimeout(async () => {
        await axios.post('http:localhost:4005/events', {
          type: 'CommentModerated',
          data: {
            ...data,
            status: data.content.includes('orange') ? 'rejected' : 'approved',
          },
        });
      }, 60000);
      break;
    }
    default: {
      break;
    }
  }

  console.log('Received event:', type);
  res.send({});
});

app.listen(4003, () => {
  console.log('Listening on 4003');
});

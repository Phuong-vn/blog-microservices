const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  switch (type) {
    case 'PostCreated': {
      posts[data.id] = { ...data, comments: [] };
      break;
    }
    case 'CommentCreated': {
      const { postId, ...rest } = data;
      posts[postId].comments.push({ ...rest });
      break;
    }
    case 'CommentUpdated': {
      const { postId, id } = data;
      const currentComment = posts[postId].comments.find((comment) => comment.id === id);
      currentComment.content = data.content;
      currentComment.status = data.status;
      break;
    }
    default: {
      break;
    }
  }
};

app.get('/query', (_req, res) => {
  res.status(200).send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body.event;
  handleEvent(type, data);
  console.log('Received event:', type);
  res.send({});
});

app.listen(4002, async () => {
  console.log('Listening on 4002');

  const { data: events } = await axios.get('http://localhost:4005');
  events.forEach(({ type, data }) => {
    console.log('Processing event:', type);
    handleEvent(type, data);
  });
});

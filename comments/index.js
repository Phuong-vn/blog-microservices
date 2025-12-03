const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.status(200).send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const { id: postId } = req.params;
  const { content } = req.body;
  const newComment = {
    id: randomBytes(4).toString('hex'),
    content,
    status: 'pending',
  };

  if (commentsByPostId[postId]) {
    commentsByPostId[postId].push(newComment);
  } else {
    commentsByPostId[postId] = [newComment];
  }

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: { ...newComment, postId },
  })
  res.status(201).send(newComment);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body.event;
  const { id, status, postId } = data;

  switch (type) {
    case 'CommentModerated': {
      const currentComment = commentsByPostId[postId].find((comment) => comment.id === id);
      if (currentComment) {
        currentComment.status = status;
        await axios.post('http://localhost:4005/events', {
          type: 'CommentUpdated',
          data: { ...currentComment, postId },
        });
      }
      break;
    }
    default: {
      break;
    }
  }

  console.log('Received event:', type);
  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});

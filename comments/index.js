const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.status(200).send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const { id: postId } = req.params;
  const { content } = req.body;
  const newComment = {
    id: randomBytes(4).toString('hex'),
    content,
  };

  if (commentsByPostId[postId]) {
    commentsByPostId[postId].push(newComment);
  } else {
    commentsByPostId[postId] = [newComment];
  }
  res.status(201).send(newComment);
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});

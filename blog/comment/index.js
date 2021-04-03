const express = require("express");
const bodyParser = require("body-parser");
const ULID = require("ulid");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const commentsById = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsById[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const id = ULID.ulid();
  const { content } = req.body;
  const comments = commentsById[req.params.id] || [];
  comments.push({id: id, content});

  commentsById[req.params.id] = comments;

  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log("Listening on port 4001");
});

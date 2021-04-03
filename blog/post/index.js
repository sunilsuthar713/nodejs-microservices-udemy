const express = require("express");
const bodyParser = require("body-parser");
const ULID = require("ulid");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Routes
const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const id = ULID.ulid();
  const { title } = req.body;
  posts[id] = {
    id,
    title
  };

  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log("Listening on port 4000");
});

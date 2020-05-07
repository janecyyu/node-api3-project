const express = require("express");
const userRouter = require("./users/userRouter");
//const postRouter = express.Router({mergeParams: true});
const postRouter = require("./posts/postRouter");
const server = express();
const cors = require('cors')

server.use(express.json());
server.use(cors());
server.use(logger);
server.use("/users", userRouter);
server.use("/users/:id/posts", postRouter);

//custom middleware

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);

  next();
}

module.exports = server;

const express = require("express");
const userRouter = require("./users/userRouter");

const server = express();
server.use(express.json());
server.use(logger);
server.use("/users", userRouter);

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "Origin"
    )}`
  );
  next();
}


module.exports = server;

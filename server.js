const express = require("express");
const router = require('./users/userRouter');

const server = express();

server.use(logger);
server.use("/",router);
// server.get("/", (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`);
// });

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "Origin"
    )}`
  );
  next();
}

function validateUserId(req,res,next){
  let id = req.headers.id;
  if (id && typeof id === "number") {
    id = id.toLowerCase();
    if (id === 1) {
      next();
    } else {
      res.status(401).send("cannot pass!");
    }
  } else {
    res.status(404).send("speak friend and enter");
  }
}

module.exports = server;

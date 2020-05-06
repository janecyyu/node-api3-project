const express = require("express");
const router = express.Router();
const server = express();
const db = require("./userDb");

server.use(express.json());
router.post("/", (req, res) => {
  // if missing name
  // if (req.body.name === undefined) {
  //   res.status(400).json({
  //     errorMessage: "Please provide name.",
  //   });
  // }
  console.log(req.body)
  db.insert(req.body)
    .then((article) => {
      res.status(201).json(article);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    });
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  db.get()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/:id", (req, res) => {
  // do your magic!
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware


function validateUserId(req, res, next) {
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

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;

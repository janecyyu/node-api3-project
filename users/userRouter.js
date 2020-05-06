const express = require("express");
const router = express.Router();
const server = express();
const db = require("./userDb");
const postDb = require("../posts/postDb");

server.use(express.json());

router.post("/", validateUser, (req, res) => {
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

router.post("/:id/posts", validateUserId, (req, res) => {
  postDb
    .insert(req.body)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "can't get the posts" });
    });
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

router.get("/:id", validateUserId, (req, res) => {
  let id = req.params.id;
  db.getById(id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "cannot get the user" });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  let id = req.params.id;
  db.getUserPosts(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "can't get the posts" });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  let id = req.params.id;
  db.remove(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "can't remove user" });
    });
});

router.put("/:id", validateUserId, (req, res) => {
  let id = req.params.id;
  db.update(id, req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "can't update user" });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  let id = req.params.id;
  db.getById(id)
    .then((user) => {
      if (user) {
        next();
      } else {
        res.status(404).send("invalid user id");
      }
    })
    .catch((err) => {
      res.status(500).send("something error on validate user id");
    });
}

function validateUser(req, res, next) {
  //console.log(Object.keys(req.body).length);
  if (Object.keys(req.body).length == 0) {
    res.status(400).json({
      errorMessage: "missing user data",
    });
  } else if (req.body.name === "") {
    res.status(400).json({
      errorMessage: "missing required name field",
    });
  }
  next();
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;

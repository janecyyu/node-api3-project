const express = require("express");
const router = express.Router({ mergeParams: true });
const postDb = require("./postDb");

router.get("/", (req, res) => {
  postDb
    .get()
    .then((posts) => {
      res.status(200).send(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("error on getting posts");
    });
});

router.get("/:id", (req, res) => {
  postDb
    .getById(req.params.id)
    .then((post) => {
      res.status(200).send(post);
    })
    .catch((error) => {
      res.status(500).send("error on get this post");
    });
});

router.delete("/:id", (req, res) => {
  postDb
    .remove(req.params.id)
    .then((post) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.status(500).send("error on get this post");
    });
});

router.put("/:id", (req, res) => {
  postDb
    .update(req.params.id, req.body)
    .then((post) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).send("error on updating!");
    });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;

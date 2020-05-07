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
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;

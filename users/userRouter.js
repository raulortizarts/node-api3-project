const express = require('express');
const user = require("./userDb");
const posts = require("../posts/postDb");
const router = express.Router();

router.post("/", validateUser(), (req, res) => {
  newUser = req.body;
  user
    .insert(newUser)
    .then(data => {
      res.status(201).send(newUser);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "error"
      });
    });
});


router.post("/:id/posts", validateUserId(), validatePost(), (req, res) => {
  // do your magic!
  const newPost = {
    text: req.body.text,
    user_id: req.params.id
  };

  posts
    .insert(newPost)
    .then(() => {
      res.status(201).json(newPost);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "error"
      });
    });
});

router.get('/', (req, res) => {
  // do your magic!
    user
      .get()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        res.status(500).json("Error");
      });
  });

  router.get("/:id", validateUserId(), (req, res) => {
    
  // do your magic!
  res.status(200).json(req.user);
  });

  router.get("/:id/posts", validateUserId(), (req, res) => {
    user.getUserPosts(req.user.id).then(userPosts => {
      return res.status(200).json(userPosts);
    });
  });

  router.delete("/:id", validateUserId(), (req, res) => {
    user.remove(req.user.id).then(() => {
      res.status(200).json({ message: "deleted" });
    });
  });

  router.put("/:id", validateUserId(), validateUser(), (req, res) => {
    updateUser = req.body;
    user.update(req.user.id, updateUser).then(() => {
      res.status(200).json(updateUser);
    });
  });

//custom middleware

function validateUserId() {
  // do your magic!
  return (req, res, next) => {
    user
      .getById(req.params.id)
      .then(data => {
        if (data) {
          req.user = data;
          next();
        } else {
          res.status(400).json({message:"Not found"});
        }
      })
      .catch(err => {
        res.status(500).json({message:"error"});
      });
  };
}

function validateUser() {
  return (req, res, next) => {
    if (!req.body.name) {
      return res.status(400).json({
        message: "error"
      });
    }
    next();
  };
}

function validatePost() {
  return (req, res, next) => {
    if (!req.body.text) {
      return res.status(400).json({
        message: "error"
      });
    }
    if (!req.body) {
      return res.status(400).json({
        message: "error"
      });
    }
    next();
  };
}

module.exports = router;

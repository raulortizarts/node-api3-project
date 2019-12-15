const express = require('express');
const user = require("./userDb");
const posts = require("../posts/postDb");
const router = express.Router();

router.post("/", validateUser(), (req, res) => {
  newUser = req.body;
  // do your magic!
  // if (!req.body.name) {
  //   return res.status(400).json({
  //     errorMessage: "error"
  //   });
  // }
  // const newUser = {
  //   name: req.body.name
  // };
  user
    .insert(newUser)
    .then(data => {
      // return res.status(201).send(newUser);
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
  // if (!req.body.text) {
  //   return res.status(400).json({
  //     errorMessage: "error"
  //   });
  // }

  posts
    .insert(newPost)
    .then(data => {
      // console.log(data, "data");
      // if (req.body.text) {
      //   return res.status(201).send(newPost);
      // }
      res.status(201).json(data);
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
  res.status(200).json(req.data);
  });
//   const id = req.params.id;
//   user
//     .getById(id)
//     .then(data => {
//       if (!data) {
//         return res.status(400).json("Not found");
//       } else {
//         return res.status(200).send(data);
//       }
//     })
//     .catch(err => {
//       res.status(500).json("error");
//     });
// });

router.get('/:id/posts', (req, res) => {
  // do your magic!
    const id = req.params.id;
    user
      .getUserPosts(id)
      .then(data => {
        if (!data) {
          return res.status(400).json("Notfound");
        } else {
          return res.status(200).send(data);
        }
      })
      .catch(err => {
        res.status(500).json("error");
      });
  });

  router.delete("/:id", validateUserId(), (req, res) => {
  // do your magic!
  // const id = req.params.id;
  // user.getById(id).then(data => {
  //   if (!data) {
  //     return res.status(404).json({ message: "Not exist" });
  //   }
  // });
  user
    // .remove(id)
    // .then(data => {
    //   if (data) {
    //     res.status(200).json({ message: "Deleted" });
    //   }
    .remove(req.data.id)
    .then(() => {
    })
    .catch(err => {
      res.status(500).json({ error: "Not removed" });
    });
});

router.put('/:id', (req, res) => {
  // do your magic!
  const updateUser = {
    name: req.body.name
  };
  const id = req.params.id;

  user.getById(id).then(data => {
    if (!data) {
      return res
        .status(404)
        .json({ message: "Not exist" });
    }

    if (!req.body.name) {
      return res.status(400).json({
        errorMessage: "error"
      });
    }

    user
      .update(id, updateUser)
      .then(data => {
        res.status(200).send(updateUser);
      })
      .catch(error => {
        res.status(500).json({
          error: "Not updated"
        });
      });
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
          req.data = data;
          next();
        } else {
          res.status(400).json("Not found");
        }
      })
      .catch(err => {
        res.status(500).json("error");
      });
  };
}

function validateUser() {
  return (req, res, next) => {
    if (!req.body.name) {
      return res.status(400).json({
        errorMessage: "error"
      });
    }
    next();
  };
}

function validatePost() {
  return (req, res, next) => {
    if (!req.body.text) {
      return res.status(400).json({
        errorMessage: "error"
      });
    }
    next();
  };
}

module.exports = router;

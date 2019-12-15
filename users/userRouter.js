const express = require('express');
const user = require("./userDb");
const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
  const newUser = {
    name: req.body.name
  };
  user
    .insert(newUser)
    .then(data => {
      return res.status(201).send(newUser);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "error"
      });
    });
});


router.post('/:id/posts', (req, res) => {
  // do your magic!
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

router.get('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id;
  user
    .getById(id)
    .then(data => {
      if (!data) {
        return res.status(400).json("Not found");
      } else {
        return res.status(200).send(data);
      }
    })
    .catch(err => {
      res.status(500).json("error");
    });
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id;
  user.getById(id).then(data => {
    if (!data) {
      return res.status(404).json({ message: "Not exist" });
    }
  });
  user
    .remove(id)
    .then(data => {
      if (data) {
        res.status(200).json({ message: "Deleted" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Not removed" });
    });
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;

const express = require('express');

const Users = require("./users-model");
const Posts = require("../posts/posts-model")

const { 
  logger,
  validateUserId,
  validateUser, 
  validatePost
} = require("../middleware/middleware");

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.use(logger);

router.get('/', async (req, res, next) => {
  try {
    const users = await Users.get();
    res.json(users);
  } catch (err) {
    err.customMessage = "Failed to retrieve the users from the database";
    next(err);
  }
});

router.get('/:id', validateUserId, (req, res, next) => {
  
  Users.getById(req.params.id)
    .then( user => res.json(user))
    .catch(next);

});

router.post('/', validateUser, (req, res, next) => {
  
  Users.insert(req.body)
    .then( newUser => res.json(newUser) )
    .catch(next);
});

router.put('/:id', validateUser, validateUserId, (req, res, next) => {
  Users.update(req.params.id, req.body)
    .then( updatedUser => res.json(updatedUser) )
    .catch(next);
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  const { id } = req.params;
  
  Users.remove(id)
    .then(() => res.json(req.user) )
    .catch(next);
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  Users.getUserPosts(req.params.id)
    .then( userPosts => res.json(userPosts) )
    .catch(next);
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  Posts.insert({...req.body, user_id: req.params.id})
    .then( newPost => res.json(newPost) )
    .catch(next);
});

router.use( (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: err.customMessage
  })
})

module.exports = router;
// do not forget to export the router

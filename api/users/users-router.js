const express = require('express');

const Users = require("./users-model");

const { 
  logger,
  validateUserId,
  validateUser 
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
    .catch( err => next(err));

});

router.post('/', validateUser, (req, res, next) => {
  
  Users.insert(req.body)
    .then( newUser => res.json(newUser) )
    .catch( err => next(err) );
});

router.put('/:id', (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.use( (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: err.customMessage
  })
})

module.exports = router;
// do not forget to export the router

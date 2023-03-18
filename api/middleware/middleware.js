const Users = require("../users/users-model");

function logger(req, res, next) {
  console.log(`${req.method} request at "${req.url}" at ${new Date().toISOString()}`);
  next();
}

async function validateUserId(req, res, next) {
  req.user = await Users.getById(req.params.id);
  if(req.user) next();
  else {
    const err = {
      message: "user not found",
      status: 404
    }
    next(err);
  }
}

function validateUser(req, res, next) {
  if(req.body.name) next();
  else next({
    message: "missing required name field",
    status: 400
  })
}

function validatePost(req, res, next) {
  if(req.body.text) next();
  else next({
    message: "missing required text field",
    status: 400
  })
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
};

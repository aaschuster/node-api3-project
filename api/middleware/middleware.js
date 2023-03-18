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
      customMessage: "No user with such ID",
      status: 404
    }
    next(err);
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
};

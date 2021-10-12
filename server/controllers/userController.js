const db = require('../postgresPool');

const userController = {};

// Adds new user to the database if signup is successfull
userController.createUser = (req, res, next) => {
  if (res.locals.error) {
    return next();
  }
  // Extracting the information we need from request body
  const { name, email, password } = req.body;

  const createUser = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;';
  const userInfo = [name, email, password];

  db.query(createUser, userInfo)
    .then(({ rows }) => {
      res.locals.user = rows[0];
      return next();
    }).catch((err) => next({
      log: `Error in userController.createUser when trying to create a new user: ERROR: ${err}`,
      message: { err: 'Error adding new user to DB' },
    }));
};

// Checks if email already in use before trying to create new user
userController.checkUser = (req, res, next) => {
  // Extracting the information we need from request body
  const { name, email, password } = req.body;

  // Validate form data before continuing
  if (!name || !email || !password) {
    res.locals.error = { message: 'Please enter all signup fields!' };
    return next();
  }

  // Query to check if email already in DB
  const checkUser = 'SELECT * FROM users WHERE email = $1';
  const params = [email];

  db.query(checkUser, params)
    .then((data) => {
    // If email is already in use
      if (data.rows[0]) {
        res.locals.error = { message: 'This email is already in use!' };
      }
      return next();
    })
    .catch((err) => next({
      log: `Error in userController.createUser when trying to create a new user: ERROR: ${err}`,
      message: { err: 'Error adding new user to DB' },
    }));
};

module.exports = userController;

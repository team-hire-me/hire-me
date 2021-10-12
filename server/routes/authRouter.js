const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Signup route via post request
router.post('/signup', userController.checkUser, userController.createUser, (req, res) => {
  // If an error has occured during signup:
  if (res.locals.error) {
    return res.status(400).json(res.locals.error);
  }
  console.log('reached end of signup route');
  return res.status(200).json(res.locals.user);
});

module.exports = router;
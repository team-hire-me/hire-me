const express = require('express');
const cookieController = require('../controllers/cookieController');
const appsController = require('../controllers/appsController');

const router = express.Router();

// Get all applications
router.get('/applications',
  cookieController.verifySession,
  appsController.getApps,
  (req, res) => {
    console.log('reached end of applications route');
    return res.status(200).json(res.locals.applications);
  });

router.post('/createApp',
  cookieController.verifySession,
  appsController.postApps,
  (req, res) => {
    if (res.locals.error) {
      return res.status(400).json(res.locals.error);
    }
    console.log('reached end of createApp route');
    return res.status(200).json(res.locals.application);
  });

module.exports = router;

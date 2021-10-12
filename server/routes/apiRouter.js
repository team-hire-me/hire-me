const express = require('express');
const cookieController = require('../controllers/cookieController');
const appsController = require('../controllers/appsController');

const router = express.Router();

// Returns all applications for users homepage
router.get('/applications',
  cookieController.verifySession,
  appsController.getApps,
  (req, res) => {
    console.log('reached end of applications route');
    return res.status(200).json(res.locals.applications);
  });

// Creates a new application from form posted by user
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

// Gets notes and todos associated with an individual application
router.get('/applications/:id',
  cookieController.verifySession,
  appsController.getNotes,
  appsController.getTodos,
  (req, res) => {
    console.log('reached end of application details route');
    return res.status(200).json(res.locals.details);
  });

// Create a new todo on a specific application
router.post('/applications/:id/todos',
  cookieController.verifySession,
  appsController.postTodo,
  (req, res) => {
    console.log('reached end of create todo route');
    return res.status(200).json(res.locals.todo);
  });

// Create a new todo on a specific application
router.post('/applications/:id/notes',
  cookieController.verifySession,
  appsController.postNote,
  (req, res) => {
    console.log('reached end of create notes route');
    return res.status(200).json(res.locals.postNote);
  });

module.exports = router;

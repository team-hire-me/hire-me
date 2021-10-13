const db = require('../postgresPool');

const appsController = {};

// Check that a user has auth to access application
appsController.appAuth = async (req, res, next) => {
  console.log('IN APP AUTH MIDDLEWARE');
  const { appID } = req.params;

  // Check that application belongs to user posting note:
  const appQ = `
    SELECT * FROM applications
    WHERE user_id = $1
    AND _id = $2
  `;

  try {
    const { rows } = await db.query(appQ, [res.locals.user._id, appID]);
    if (!rows.length) {
      res.locals.error = { message: 'User does not have access to this application!' };
      return res.status(401).json(res.locals.error);
    }
    return next();
  } catch (err) {
    next({
      log: `Error in appsController.appAuth when validating application belongs to user: ${err}`,
      message: { err: 'Error validating user has authorisation for application' },
    });
  }
};

// Get all of a users applications and return them
appsController.getApps = async (req, res, next) => {
  console.log('inside get apps');

  const appRetrieval = `
    SELECT * FROM applications
    WHERE user_id = $1
    AND archived = FALSE
  `;
  try {
    const { rows } = await db.query(appRetrieval, [res.locals.user._id]);
    res.locals.applications = rows;
    return next();
  } catch (err) {
    next({
      log: `Error in appsController.getApps when trying to get all of a users applications: ${err}`,
      message: { err: 'Error getting applications from DB' },
    });
  }
};

// Create a new application in the database
appsController.postApps = async (req, res, next) => {
  console.log('inside posting app');

  const { title, company_name, location, description, link } = req.body;
  const params = [res.locals.user._id, title, company_name, location, description, link];

  // Validate application form data is complete
  if (!params.every((e) => {
    if (e) return true;
    return false;
  })) {
    res.locals.error = { message: 'Please enter all application fields!' };
    return res.status(400).json(res.locals.error);
  }

  const appPosting = `
    INSERT INTO applications
    (user_id, title, company_name, location, description, link)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;

  try {
    const { rows } = await db.query(appPosting, params);
    console.log('ROWS ARE:, ', rows);
    res.locals.application = rows[0];
    return next();
  } catch (err) {
    next({
      log: `Error in appsController.postApps when trying to post application into db: ${err}`,
      message: { err: 'Error posting applications into DB' },
    });
  }
};


// Get all notes for a particular application
appsController.getNotes = async (req, res, next) => {
  console.log('TRYING TO GET NOTES FOR: ', req.params.appID);
  const { appID } = req.params;
  const getNotes = `
    SELECT * FROM notes
    WHERE applications_id = $1
    AND user_id = $2
  `;

  try {
    const { rows } = await db.query(getNotes, [appID, res.locals.user._id]);
    res.locals.details = { notes: rows };
    return next();
  } catch (err) {
    next({
      log: `Error in appsController.getNotes when trying to get application notes from db: ${err}`,
      message: { err: 'Error getting notes from DB' },
    });
  }
};

// Get all todos for a particular application
appsController.getTodos = async (req, res, next) => {
  console.log('trying to get todos');
  const { appID } = req.params;
  const getTodos = `
    SELECT * FROM todos
    WHERE applications_id = $1
    AND user_id = $2
  `;

  try {
    const { rows } = await db.query(getTodos, [appID, res.locals.user._id]);
    res.locals.details.todos = rows;
    return next();
  } catch (err) {
    next({
      log: `Error in appsController.getTodos when trying to get application notes from db: ${err}`,
      message: { err: 'Error getting todos from DB' },
    });
  }
};

// Create a new note on a specific application
appsController.postNote = async (req, res, next) => {
  console.log('IN POST NOTE MIDDLEWARE');
  // grab the information we need from the request body
  const { appID } = req.params;
  const { content } = req.body;

  // Validate that note content exists
  if (!content) {
    res.locals.error = { message: 'No content on note'};
    return res.status(400).json(res.locals.error);
  }

  const postNote = `
    INSERT INTO notes
    (user_id, applications_id, content)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const params = [res.locals.user._id, appID, content];

  try {
    const { rows } = await db.query(postNote, params);
    res.locals.postNote = rows[0];
    return next();
  } catch (err) {
    next({
      log: `Error in appsController.postNote when trying to get post note to db: ${err}`,
      message: { err: 'Error creating new note in DB' },
    });
  }
};

// Create a new todo for a specific application
appsController.postTodo = async (req, res, next) => {
  console.log('inside posting todos to the db');
  const { appID } = req.params;
  const { content } = req.body;

  // Validate that to do content exists
  if (!content) {
    res.locals.error = { message: 'No content on to-do' };
    return res.status(400).json(res.locals.error);
  }

  const toDoPosting = `
    INSERT INTO todos (user_id, applications_id, content)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const params = [res.locals.user._id, appID, content];

  try {
    const { rows } = await db.query(toDoPosting, params);
    console.log('ROWS ARE:, ', rows);
    res.locals.todo = rows[0];
    return next();
  } catch (err) {
    next({
      log: `Error in appsController.postTodo when trying to post to do talk into db: ${err}`,
      message: { err: 'Error posting to dos into DB' },
    });
  }
};

// Toggles the checked status of a Todo Item on an Application
appsController.toggleTodo = async (req, res, next) => {
  console.log('Trying to change the checked status of a todo', req.params);
  const { appID, todoID } = req.params;
  const { checked } = req.body;

  // Set todo checked status in DB as requested in request body
  const todoCheck = `
    UPDATE todos
    SET checked = $1
    WHERE _id = $2
    AND user_id = $3
    AND applications_id = $4
    RETURNING *
  `;
  const params = [checked, todoID, res.locals.user._id, appID];

  try {
    const { rows } = await db.query(todoCheck, params);
    res.locals.todo = rows[0];
    return next();
  } catch (err) {
    next({
      log: `Error in appsController.toggleTodo when trying to toggle a todo checked status: ${err}`,
      message: { err: 'Error toggling todo checked status in DB' },
    });
  }
};

// Gets all archived apps from a user
appsController.getArchive = async (req, res, next) => {
  // create the query string
  const getArchive = `
    SELECT * FROM applications
    WHERE user_id = $1
    AND archived = TRUE
  `;

  try {
    const { rows } = await db.query(getArchive, [res.locals.user._id]);
    res.locals.archive = rows;
    return next();
  } catch (err) {
    next({
      log: `Error in appsController.getArchive when trying to get archived apps from db: ${err}`,
      message: { err: 'Error getting archive from DB' },
    });
  }
};

//
appsController.toggleArchive = async (req, res, next) => {
  const { appID } = req.params;
  const { archived } = req.body;

  // create query string
  const addArchive = `
  UPDATE applications
  SET archived = $1
  WHERE _id = $2
  AND user_id = $3
  RETURNING *
  `;
  const params = [archived, appID, res.locals.user._id];

  // execute query
  try {
    const { rows } = await db.query(addArchive, params);
    res.locals.application = rows[0];
    return next();
  } catch (err) {
    next({
      log: `Error in appsController.toggleArchive when adding to user's archive: ${err}`,
      message: { err: 'Error in adding app to user archive in DB' },
    });
  }
};

module.exports = appsController;

// 'UPDATE applications
// SET archived = 1
// WHERE archived = 0'
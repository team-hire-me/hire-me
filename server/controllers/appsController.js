const db = require('../postgresPool');

const appsController = {};

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
  RETURNING *`;

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
  console.log('TRYING TO GET NOTES FOR: ', req.params.id);
  const appID = req.params.id;
  const getNotes = `
  SELECT * FROM notes
  WHERE applications_id = $1
  AND user_id = $2`;

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
  const appID = req.params.id;
  const getTodos = `
  SELECT * FROM todos
  WHERE applications_id = $1
  AND user_id = $2`;

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
  // grab the information we need from the request body
  const appID = req.params.id;
  const { content } = req.body;

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
  } catch (err) {
    next({
      log: `Error in appsController.postNote when validating application belongs to user: ${err}`,
      message: { err: 'Error validating appl to create new note in DB' },
    });
  }

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
  const appID = req.params.id;
  const { content } = req.body;

  // Validate that to do content exists
  if (!content) {
    res.locals.error = { message: 'No content on to-do' };
    return res.status(400).json(res.locals.error);
  }

  // Check that application belongs to user posting to do:
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
  } catch (err) {
    next({
      log: `Error in appsController.postToDos when validating application belongs to user: ${err}`,
      message: { err: 'Error validating appl to create new todo in DB' },
    });
  }

  const toDoPosting = `
  INSERT INTO todos (user_id, applications_id, content)
  VALUES ($1, $2, $3)
  RETURNING *`;

  const params = [res.locals.user._id, appID, content];

  try {
    const { rows } = await db.query(toDoPosting, params);
    console.log('ROWS ARE:, ', rows);
    res.locals.todo = rows[0];
    return next();
  } catch (err) {
    next({
      log: `Error in appsController.postToDos when trying to post to do talk into db: ${err}`,
      message: { err: 'Error posting to dos into DB' },
    });
  }
};

module.exports = appsController;

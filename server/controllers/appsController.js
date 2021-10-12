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

module.exports = appsController;

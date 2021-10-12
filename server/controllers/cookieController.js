const db = require('../postgresPool');
const nOnce = require('../helpers/getNonce');

const cookieController = {};

// Initialise placeholder row in sessions table on signup
cookieController.initSession = async (req, res, next) => {
  if (res.locals.error) {
    return next();
  }
  console.log('INSIDE INITSESSION');
  const userID = res.locals.user._id;

  const sessionQ = 'INSERT INTO sessions (user_id, ssid) VALUES ($1, $2)';

  try {
    await db.query(sessionQ, [userID, userID]);
  } catch (err) {
    next({
      log: `Error in cookieController.initSession when trying to initialise a new user session: ERROR: ${err}`,
      message: { err: 'Error adding session to DB' },
    });
  }

  return next();
};

// Generates unique random SSID for user identification, and inserts it into DB
cookieController.generateSSID = async (req, res, next) => {
  if (res.locals.error) {
    return next();
  }
  let SSID = false;

  while (!SSID) {
    const trialSSID = nOnce();

    // Check if DB contains the trial SSID already:
    const SSIDQ = 'SELECT * FROM sessions WHERE ssid = $1';
    try {
      const { rows } = await db.query(SSIDQ, [trialSSID]);
      console.log('Rows returned from DB in generateSSID: ', rows);
      // If SSID is unique then add SSID to DB for user
      if (!rows.length) {
        SSID = true;
        const insertSSIDQ = 'UPDATE sessions SET ssid = $1 WHERE user_id = $2';
        await db.query(insertSSIDQ, [trialSSID, res.locals.user._id]);
        res.locals.ssid = trialSSID;
        return next();
      }
    } catch (err) {
      next({
        log: `Error in sessionController.generateSSID when trying to generate a new unique user ssid: ERROR: ${err}`,
        message: { err: 'Error adding SSID to DB' },
      });
    }
  }
};

// create cookie for user
cookieController.setCookie = (req, res, next) => {
  if (res.locals.error) {
    return next();
  }
  res.cookie('cookie', res.locals.ssid);
  return next();
};

module.exports = cookieController;

const express = require('express');
const path = require('path');
// const apiRouter = require('./routes/apiRouter');

// Create express App
const app = express();
const PORT = 3000;

if (process.env.NODE_ENV === 'production') {
  // Serve webpackfile bundle from dist folder:
  app.use('/dist', express.static(path.join(__dirname, '../dist')));
  // Serve main html page
  app.use('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
  });
}

// Router
// app.use('/api', apiRouter);

// App listens on PORT
app.listen(PORT, () => console.log('Listening on port:', PORT));

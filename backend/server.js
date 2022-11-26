// require app.js
const app = require('./app');

// listen on process.env.PORT or 5000
const port = process.env.PORT || 5000;

// start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

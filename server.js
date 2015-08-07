var connect = require('connect'),
  serveStatic = require('serve-static');

connect()
  .use(serveStatic(
    __dirname,
    { 'index': ['index.html'] }
  ))
  .listen(8080);

var app = require('express')();
var srv = require('http').createServer(app);
var bodyParser = require('body-parser');

app.post('/', function (req, res, next) {
  res.send('You POSTed to the micro-service!');
});

srv.listen(8686, function () {
  console.log('Listening on 8686');
});
var express = require('express');
var path = require('path');
var index = require('./routes/index');
var nodemon = require('nodemon');

var app = express();

app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.listen(app.get('port'), function () {
  console.log('Node.js/Express is listening on port ' + app.get('port'));
});

module.exports = app;
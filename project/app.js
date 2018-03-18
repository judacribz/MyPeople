var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var nodemon = require('nodemon');

var app = express();

app.set('port', process.env.PORT || 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', require('./routes/index'));
app.use('/', require('./routes/group'));
app.use('/', require('./routes/channel'));

app.listen(app.get('port'), function () {
  console.log('Node.js/Express is listening on http://localhost:' + app.get('port') + '/');
});

module.exports = app;
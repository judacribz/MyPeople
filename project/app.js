const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const uuid = require('uuid/v1');
const session = require('express-session');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const assert = require('assert');
const opn = require('opn');
const path = require('path');
const nodemon = require('nodemon');
const build = require('./build.js');

// require routes setup
const routes = require('./routes');
const index = require('./routes/index');
const group = require('./routes/group');
const channel = require('./routes/channel');
const signup = require('./routes/signup');

// helper functions setup
const fb = require('./utilities/firebase');

var app = express();

// setup firebase config
fb.setupFirebase();

// start mongod in background
build()

// protect website
app.use(helmet());

app.set('port', process.env.PORT || 3000);
app.set('host', "localhost");
const url = 'http://' + app.get('host') + ':' + app.get('port') + '/';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Compress all routes for faster deployment
app.use(compression());

// middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// routes setup, add new route here and to routes directory
app.use('/', index);
app.use('/group', group);
app.use('/channel', channel);
app.use('/signup', signup);

app.listen(app.get('port'), function () {
  console.log('Node.js/Express is listening on ' + url);
  // opn(url);
});



mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/myPeople');

app.use(session({
  genid: function (request) {
    return uuid();
  },
  resave: false,
  saveUninitialized: false,
  //cookie: {secure: true},
  secret: 'apollo slackware prepositional expectations'
}));

var Schema = mongoose.Schema;
var userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    index: true
  },
  email: String,
  usercontacts: [String]
}, {
  collection: 'users'
});
var User = mongoose.model('user', userSchema);

var GroupSchema = new Schema({
  channels: [{
    members: String,
    messages: [{
      username: String,
      content: String,
      timestamp: String
    }]
  }]
}, {
  collection: 'groups'
});
var Group = mongoose.model('group', GroupSchema);

module.exports = app;
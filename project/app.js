const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid/v1');
const session = require('express-session');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const assert = require('assert');
const opn = require('opn');
const path = require('path');
const nodemon = require('nodemon');

const routes = require('./routes');
const index = require('./routes/index');
const group = require('./routes/group');
const channel = require('./routes/channel');
const signup = require('./routes/signup');


var app = express();

app.set('port', process.env.PORT || 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use('/', index);
app.use('/group', group);
app.use('/channel', channel);
app.use('/signup', signup);

var url = 'http://localhost:' + app.get('port') + '/';
app.listen(app.get('port'), function () {
  console.log('Node.js/Express is listening on ' + url);
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



opn(url);

module.exports = app;
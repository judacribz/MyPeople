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

const routes = path.join(__dirname, 'routes');

// helper functions setup
const fb = require('./utilities/firebase');

// setup firebase and mongo in background
fb.setupFirebase();

// It begins!
var app = express();

// protect from attacks
app.use(helmet());

// set port and host
app.set('port', process.env.PORT || 3000);
app.set('host', "localhost");
const url = 'http://' + app.get('host') + ':' + app.get('port') + '/';

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'pug');

//Compress all routes
app.use(compression());

// middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

/*
 * Routes Setup
 * ============
 * add route here when adding new pages
 * add the page path at the top of this file
 */
// require routes setup

const index = require(routes + '/index');
const signup = require(routes + '/signup');
const group = require(routes + '/group');
const channel = require(routes + '/channel');
const message = require(routes + '/message');
const welcome = require(routes + '/welcome');

app.use('/', index);
app.use('/signup', signup);
app.use('/message', message);
app.use('/welcome', welcome);
app.use('/group', group);
app.use('/group', channel);

app.use(session({
  genid: function (request) {
    return uuid();
  },
  resave: false,
  saveUninitialized: false,
  //cookie: {secure: true},
  secret: 'apollo slackware prepositional expectations'
}));

app.listen(app.get('port'), function () {
  console.log('Node.js/Express is listening on ' + url);
  // opn(url);
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/myPeople');

module.exports = app;
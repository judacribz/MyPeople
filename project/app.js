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
app.set('views', path.join(__dirname, 'views'));
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
app.use('/group', group);
app.use('/channel', channel);
app.use('/message', message);
app.use('/welcome', welcome);

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

var Schema = mongoose.Schema;
var userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    index: true
  },
  email: {
    type: String,
    index: true
  },
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


var rootRef = fb.firebase.database().ref().child("users");

var rootGroup = fb.firebase.database().ref().child("groups");

var user__name = [];
var emails = [];

var user11, email_t;

rootRef.on("child_added", snap => {
  var user11 = snap.child("username").val();
  var email_t = snap.child("email").val();

  user__name.push(user11);
  emails.push(email_t);

  loadUsers(user11, email_t);
});

rootGroup.on("value", snap => {
  var u = snap.child("value").val();
  //console.log(u);
});

function loadUsers(user11, email_t) {
  var studentData = {
    username: user11,
    email: email_t
  };
  User.find({
    username: user11
  }).then(function (results) {
    if (results.length > 0) {
      // update the student
      User.update({
          username: user11
        },
        studentData, {
          multi: false
        },
        function (error, numAffected) {
          if (error || numAffected != 1) {
            console.log('No need to update ' + error);

          } else {
            console.log('Student updated');
          }
        });
    } else {
      // save a new student
      var newStudent = new User(studentData);
      newStudent.save(function (error) {
        if (error) {
          console.log('Unable to save student');

        } else {
          console.log('Student added');
        }
      });
    }
  });
}


function getUsernames() {
  User.find({}, {
    username: 1,
  }).then(function (results) {
    return results;
  });
}

getUsernames();

module.exports = app;
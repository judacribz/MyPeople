const express = require('express');
const fb = require("../utilities/firebase");
const applic = require("../app");

var router = express.Router();

var rootRef = fb.firebase.database().ref().child("users");

  //Gets Usernames
  var username1 = [];
  var e = [];
  rootRef.on("child_added", snap =>{
   var user = snap.child("username").val();
   var email_t = snap.child("email").val();
   username1.push(user);
   e.push(email_t);
  });

  router.get('/', function (req, res) {
      fb.checkAuth(res, () => {
          info = fb.getInfo();

          res.render('message', {
              title: 'DIRECT MESSAGE | My People',
              groupList: info.groupNames,
              channelList: info.channelNames,
              messageList: username1
          });
      });
  });

module.exports = router;

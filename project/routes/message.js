const express = require('express');
const fb = require("../utilities/firebase");
const applic = require("../app");

var router = express.Router();

var rootRef = fb.firebase.database().ref().child("users");


  var username1 = [];
  var e = [];
  rootRef.on("child_added", snap =>{
   var user = snap.child("username").val();
   var email_t = snap.child("email").val();
   username1.push(user);
   e.push(email_t);
  });


router.get('/', function (req, res) {
    res.render('message', {
        title: 'DIRECT MESSAGE | My People',
        groupList: ['Group1'],
        channelList: ['Channel1','Channel2'],
        messageList: username1
    });
});

module.exports = router;

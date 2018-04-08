const express = require('express');
const fb = require("../utilities/firebase");
const applic = require("../app");
var router = express.Router();

var rootRef = fb.firebase.database().ref().child("users");

<<<<<<< HEAD
  var username1 = [];
  var e = [];
  rootRef.on("child_added", snap =>{
   var user = snap.child("username").val();
   var email_t = snap.child("email").val();
   username1.push(user);
   e.push(email_t);


  });
=======
var username = [];
rootRef.on("child_added", snap => {
    var user = snap.child("username").val();
    username.push(user);
});
>>>>>>> 4ec6f111f1b8ca086dff7cfe627cc58622d581a3

/* GET home page. */
router.get('/', function (req, res) {
    res.render('message', {
        title: 'DIRECT MESSAGE | My People',
        groupList: ['Group1'],
        channelList: ['Channel1','Channel2'],
        messageList: username1
    });
});

module.exports = router;
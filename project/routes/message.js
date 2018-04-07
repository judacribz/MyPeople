const express = require('express');
const fb = require("../utilities/firebase");
var router = express.Router();

var rootRef = fb.firebase.database().ref().child("users");

  var username = [];
  rootRef.on("child_added", snap =>{
   var user = snap.child("username").val();
   username.push(user);
  });

/* GET home page. */
router.get('/', function (req, res) {
    res.render('message', {
        title: 'DIRECT MESSAGE | My People',
        channelList: username
    });
});

module.exports = router;

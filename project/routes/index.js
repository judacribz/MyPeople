var express = require('express');
const fb = require("../utilities/firebase");
var router = express.Router();



// push message to firebase db
router.post('/', function (req, res) {
  var email = req.body.email;
  var password = req.body.password;


  fb.firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
    res.redirect('/channel');

    fb.fbPushUser(fb.firebase.auth().currentUser);


  }).catch(function (error) {
    console.log(error.message);
    $('#password').val("");
    // Text field error, if password is incorrect
  });
});

/* GET home page. */
router.get('/', function (req, res) {
  res.render('login', {
    title: 'Sign In | My People'
  });
});

module.exports = router;
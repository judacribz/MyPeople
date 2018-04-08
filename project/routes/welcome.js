const fb = require("../utilities/firebase");
const firebase = fb.firebase;
const express = require('express');
var router = express.Router();

var user = fb.firebase.auth().currentUser;

/* GET welcome page. */
router.get('/', function (req, res) {
	res.render('welcome', {
		title: 'Welcome | My People'
	});
});

/* POST to welcome page */
router.post('/', function (req, res) {

});

module.exports = router;
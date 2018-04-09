const fb = require("../utilities/firebase");
const firebase = fb.firebase;
const express = require('express');
const router = express.Router();

fb.getGroups();

/* GET welcome page. */
router.get('/', function (req, res) {
	if (firebase.auth().currentUser) {
		var user = fb.firebase.auth().currentUser;
		res.render('welcome', {
			title: 'Welcome | My People',
			user: user.displayName
		});
	} else {
		res.redirect('/');
	}
});

/* POST to welcome page */
router.post('/', function (req, res) {

});

module.exports = router;
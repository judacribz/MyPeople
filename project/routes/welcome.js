const fb = require("../utilities/firebase");
const firebase = fb.firebase;
const express = require('express');
const router = express.Router();


var info = fb.getInfo();
/* GET welcome page. */
router.get('/', function (req, res) {
	fb.checkAuth(res, () => {
		/* Populate the list group with user channels */
		/* If list group item is clicked then take the user to the respective channel */
		var user = fb.firebase.auth().currentUser;
		res.render('welcome', {
			title: 'Welcome | My People',
			user: user.displayName,
			groupList: info.groupNames,
			channelList: info.channelNames
		});
	});
});

/* POST to welcome page */
router.post('/', function (req, res) {

});

module.exports = router;
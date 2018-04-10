const fb = require("../utilities/firebase");
const firebase = fb.firebase;
const express = require('express');
const router = express.Router();

var info = fb.getInfo();
var channelNames = [];

/* GET welcome page. */
router.get('/', function (req, res) {
	fb.checkAuth(res, () => {
		/* Populate the list group with user channels */
		/* If list group item is clicked then take the user to the respective channel */

		var parts = [];
		for (var i = 0; i < info.channelNames.length; i++) {
			parts = info.channelNames[i].split('/');
			channelNames.push(parts[0] + ' | ' + parts[2]);
		}

		var user = fb.firebase.auth().currentUser;
		res.render('welcome', {
			title: 'Welcome | My People',
			user: user.displayName,
			groupList: info.groupNames,
			channelNames: channelNames,
			channelList: info.channelNames
		});
	});
});

module.exports = router;
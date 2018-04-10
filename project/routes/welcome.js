const fb = require("../utilities/firebase");
const firebase = fb.firebase;

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const mongodb = require("../utilities/mongodb");
const models = {
	userSchema: require("../models/user.schema"),
	groupSchema: require("../models/group.schema")
};

var User = mongoose.model('user', models.userSchema);
var Group = mongoose.model('group', models.groupSchema);

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

		// var rootRef = fb.firebase.database().ref().child("users");

		// var rootGroup = fb.firebase.database().ref().child("groups");

		// var user__name = [];
		// var emails = [];

		// var user11, email_t;

		// rootRef.on("child_added", snap => {
		// 	var user11 = snap.child("username").val();
		// 	var email_t = snap.child("email").val();

		// 	user__name.push(user11);
		// 	emails.push(email_t);

		// 	mongodb.loadUsers(user11, email_t);
		// });

		// rootGroup.on("value", snap => {
		// 	var u = snap.child("value").val();
		// 	//console.log(u);
		// });
	});
});

/* POST to welcome page */
router.post('/', function (req, res) {

});

module.exports = router;
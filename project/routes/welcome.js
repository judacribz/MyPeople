const fb = require("../utilities/firebase");
const firebase = fb.firebase;
const express = require('express');
var router = express.Router();

/* GET welcome page. */
router.get('/', function (req, res) {
	res.render('welcome', {
		title: 'Welcome | My People'
	});
});

module.exports = router;
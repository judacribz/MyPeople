const fb = require("../utilities/firebase");
const express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    res.render('channel', {
        title: 'CHANNEL_NAME | My People',
        groupList: ["coolGroup", "randgroup", "tests"],
        channelList: ["labs", "randChannel", "tests", "good"]
    });
});

// push message to firebase db
router.post('/', function (req, res) {
    var user = fb.firebase.auth().currentUser;

    fb.fbPushMessage(user, req.body.message);
});

module.exports = router;
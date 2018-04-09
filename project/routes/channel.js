const fb = require("../utilities/firebase");
const firebase = fb.firebase;
const express = require('express');
const router = express.Router();

var groupList = fb.getGroups();

router.get('/', function (req, res) {

    if (firebase.auth().currentUser) {
        res.render('channel', {
            title: 'CHANNEL_NAME | My People',
            groupList: fb.getGroups(),
            channelList: fb.getGroups(),
        });
    } else {
        res.redirect('/');
    }
});

// push message to firebase db
router.post('/', function (req, res) {
    var user = fb.firebase.auth().currentUser;

    fb.pushMessage(user, req.body.message);
});

module.exports = router;
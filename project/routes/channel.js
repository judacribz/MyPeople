const fb = require("../utilities/firebase");
const firebase = fb.firebase;
const express = require('express');
const router = express.Router();
var info;

router.get('/', function (req, res) {
    fb.checkAuth(res, () => {
        info = fb.getInfo();

        res.render('channel', {
            title: 'CHANNEL_NAME | My People',
            groupList: info.groupNames,
            channelList: info.channelNames,
        });
    });
});

router.get('/:chanId', function (req, res) {
    var chanName = req.params.chanId;

    fb.checkAuth(res, () => {
        info = fb.getInfo();

        res.render('channel', {
            title: chanName + ' | My People',
            groupList: info.groupNames,
            channelList: info.channelNames,
        });
    });
});

// push message to firebase db
router.post('/', function (req, res, next) {
    fb.checkAuth(res, () => {
        var user = fb.firebase.auth().currentUser;

        fb.pushMessage(user, req.body.message);
    })
});

// push message to firebase db
router.get('/', function (req, res, next) {
    console.log('end post');
});


module.exports = router;
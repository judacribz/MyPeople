const fb = require("../utilities/firebase");
const express = require('express');
const router = express.Router();
var info = fb.getInfo();

router.get('/', function (req, res) {
    fb.checkAuth(res, () => {

        res.render('message', {
            title: 'DIRECT MESSAGE | My People',
            groupList: info.groupNames,
            channelList: info.channelNames,
            messageList: info.usernames
        });
    });
});

module.exports = router;
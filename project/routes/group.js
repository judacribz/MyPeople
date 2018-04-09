const fb = require("../utilities/firebase");
const firebase = fb.firebase;
const express = require('express');
const router = express.Router();
var info;

router.get('/', function (req, res) {
    fb.checkAuth(res, () => {
        info = fb.getInfo();

        res.render('group', {
            title: 'GROUP_NAME | My People',
            groupList: info.groupNames,
            channelList: info.channelNames
        });
    });
});

router.get('/:groupId', function (req, res) {
    fb.checkAuth(res, () => {
        info = fb.getInfo();

        var groupName = req.params.groupId;
        var channelNames = fb.getChannels(groupName);
        res.render('group', {
            title: groupName + ' | My People',
            groupList: info.groupNames,
            channelList: channelNames
        });
    });
});

module.exports = router;
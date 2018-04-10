const fb = require("../utilities/firebase");
const firebase = fb.firebase;
const express = require('express');
const router = express.Router();
var info = fb.getInfo();

router.get('/:groupId', function (req, res) {
    fb.checkAuth(res, () => {
        var groupName = req.params.groupId;
        var channelNames = fb.getChannels(groupName);
        res.render('group', {
            title: groupName + ' | My People',
            groupList: info.groupNames,
            channelList: channelNames,
            messageList: info.usernames
        });
    });
});

module.exports = router;
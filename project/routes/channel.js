const fb = require("../utilities/firebase");
const firebase = fb.firebase;
const express = require('express');
const router = express.Router();
var info = fb.getInfo();

router.get('/:groupId/channel/:chanId', (req, res) => {
    fb.checkAuth(res, () => {
        var groupName = req.params.groupId;
        var chanName = req.params.chanId;

        res.render('channel', {
            title: chanName + ' | My People',
            user: firebase.auth().currentUser.displayName,
            groupList: info.groupNames,
            channelList: info.channelNames,
            messageList: info.usernames,
            groupId: groupName,
            chanId: chanName
        });
    });
});

// push message to firebase db
router.post('/:groupId/channel/:chanId', (req, res, next) => {
    fb.checkAuth(res, () => {
        var groupName = req.params.groupId;
        var chanName = req.params.chanId;

        var user = fb.firebase.auth().currentUser;

        fb.pushMessage(user, req.body.message, groupName, chanName);
    })
});

module.exports = router;
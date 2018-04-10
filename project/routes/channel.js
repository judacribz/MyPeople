const fb = require("../utilities/firebase");
const firebase = fb.firebase;
const express = require('express');
const router = express.Router();
var info;

router.get('/:groupId/channel/:chanId', function (req, res) {
    var groupName = req.params.groupId;
    var chanName = req.params.chanId;

    fb.checkAuth(res, () => {
        info = fb.getInfo();

        res.render('channel', {
            title: chanName + ' | My People',
            groupList: info.groupNames,
            channelList: info.channelNames,
            messageList: info.usernames,
            groupId: groupName,
            chanId: chanName
        });
    });
});

// push message to firebase db
router.post('/:groupId/channel/:chanId', function (req, res, next) {
    var groupName = req.params.groupId;
    var chanName = req.params.chanId;

    fb.checkAuth(res, () => {
        var user = fb.firebase.auth().currentUser;

        fb.pushMessage(user, req.body.message, groupName, chanName);
    })
});

// // push message to firebase db
// router.get('/:groupId/channel/:chanId', function (req, res, next) {
//     console.log('end post');
// });


module.exports = router;
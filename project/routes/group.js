const fb = require("../utilities/firebase");
const firebase = fb.firebase;
const express = require('express');
const router = express.Router();

var groupList = fb.getGroups();

router.get('/', function (req, res) {
    fb.checkAuth(res, () => {
        res.render('group', {
            title: 'GROUP_NAME | My People',
            groupList: groupList,
            channelList: groupList
        });
    });
});

router.get('/:groupId', function (req, res) {
    fb.checkAuth(res, () => {
        res.render('group', {
            title: 'GROUP_NAME | My People',
            groupList: fb.getGroups(),
            channelList: fb.getGroups(),
        });
    });
});

module.exports = router;
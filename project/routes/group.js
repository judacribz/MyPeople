const fb = require("../utilities/firebase");
const firebase = fb.firebase;
const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    if (firebase.auth().currentUser) {
        fb.getGroups();

        res.render('group', {
            title: 'GROUP_NAME | My People',
            groupList: ["coolGroup", "randgroup", "tests"]
        });
    } else {
        res.redirect('/');
    }
});

module.exports = router;
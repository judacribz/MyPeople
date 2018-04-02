const fb = require('../utilities/firebase');
const express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('channel', {
        title: 'CHANNEL_NAME | My People',
        channelList: ["labs", "randChannel", "tests", "good"]
    });
});

/* GET home page. */
router.post('/', function (req, res) {
    fb.fbPushMessage("Joe", req.body.message);
});

module.exports = router;
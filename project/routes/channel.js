var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/channel', function (req, res) {
    res.render('channel', {
        title: 'CHANNEL_NAME | My People',
        channelList: ["labs", "randChannel", "tests", "good"]
    });
});

module.exports = router;
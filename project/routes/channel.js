var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/channel', function (req, res) {
    res.render('channel', {title: 'CHANNEL_NAME'});
});

module.exports = router;
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('group', {
        title: 'GROUP_NAME | My People',
        groupList: ["coolGroup", "randgroup", "tests"]
    });
});

module.exports = router;
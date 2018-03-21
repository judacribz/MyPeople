var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/group', function (req, res) {
    res.render('group', {
        title: 'GROUP_NAME | My People',
        groupList: ["coolGroup", "randgroup", "tests"]
    });
});

// router.get('/group/:groupId', function (req, res) {     res.render('group', {
//         title: req.params + ' | My People ',         groupList: [
// "coolGroup", "randgroup", "tests"         ],         groupId: req.params });
// })

module.exports = router;

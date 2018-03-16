var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/group', function (req, res) {
    res.render('group', {title: 'GROUP_NAME'});
});

module.exports = router;

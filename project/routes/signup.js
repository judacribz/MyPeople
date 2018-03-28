var express = require('express');
var router = express.Router();

/* GET signup page. */
router.get('/', function (req, res) {
    res.render('signup', {
        title: 'Get Started | My People'
    });
});

module.exports = router;
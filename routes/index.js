var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/add', function(req, res, next) {
  res.render('add-profile-bookmark', {});
});

router.get('/profile', function(req, res, next) {
  res.render('profile', {});
});

module.exports = router;

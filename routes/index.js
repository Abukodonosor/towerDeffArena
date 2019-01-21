var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//joyPAd for mobile playing
router.get('/joypad', function(req, res, next) {
  res.render('joypad', {});
});

module.exports = router;

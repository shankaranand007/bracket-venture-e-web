var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next)=> {
  // res.render('index', { title: 'HI shankar' });
  res.render('index.html');
});

module.exports = router;

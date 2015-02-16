var express = require('express');
var router = express.Router();

/* GET room page. */
router.get('/:roomId', function(req, res) {

  res.render('board');
});

module.exports = router;
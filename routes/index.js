var express = require('express');
var router = express.Router();

router.use('/auth',require('./auth'))
router.use('/blog',require('./blog'))
 
module.exports = router;

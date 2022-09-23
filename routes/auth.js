var express = require('express');
var router = express.Router();

const AUTH = require('../controllers/auth')

/**
 * User registration
 */
router.post('/register', AUTH.register);
/**
 * User login
 */
router.post('/login', AUTH.login);

module.exports = router;

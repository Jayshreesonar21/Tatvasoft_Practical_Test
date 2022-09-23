const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../config');

// Create JWT Token
exports.generateJwt = (obj) => jwt.sign(obj, jwtSecretKey);

// Verify token
exports.verifyToken = (token) => jwt.verify(token, jwtSecretKey);


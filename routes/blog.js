var express = require('express');
var router = express.Router();

const BLOG = require('../controllers/blog');
const { isExist } = require('../validations/blog');
const { isAuth } = require('../middlewares/authentication')

/**
 * Create blog
 */
router.post('/', isAuth(['admin', 'user']), BLOG.create);
/**
 * Get all blogs
 */
router.get('/all', isAuth(['admin', 'user']), BLOG.blogs);
/**
 * Update blog
 */
router.put('/:id', isAuth(['admin', 'user']), isExist, BLOG.update);
/**
 * Delete blog
 */
 router.delete('/:id', isAuth(['admin', 'user']), isExist, BLOG.delete);

module.exports = router;

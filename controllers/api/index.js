const router = require('express').Router();
const users = require('./user-routes');
const postsComments = require('./blog-post-routes');

router.use('/users', users);
router.use('/posts', postsComments);

module.exports = router;
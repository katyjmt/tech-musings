const router = require('express').Router();

// Home Page Routes (View Home Page w/ Blog Posts)
const homeRoutes = require('./home-routes');
// Dashboard Routes (View User Posts, Open Existing Post to Edit)
const dashboardRoutes = require('./dashboard-routes');
// Blog Detail Routes (View Specifics of Blog Post, incl Comments)
const blogDetailRoutes = require('./blog-detail-routes');

// API Routes (for POST / PUT / DELETE requests - login/logout, create/edit/delete post, comment)
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/blog', blogDetailRoutes);
router.use('/login', loginSignupRoutes);
router.use('/api', apiRoutes);

module.exports = router;

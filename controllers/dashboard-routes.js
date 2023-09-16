const router = require('express').Router();
// Add models required for dashboard
const Post = require('../models/Posts');
const User = require('../models/Users');
// Import withAuth middlewear to check if user is logged in before completing request
const { withAuth } = require('./utils/withAuth');

// Route to get post data to display list of user posts
router.get('/', withAuth, async (req, res) => {
  try {
    const userPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
          // Structure of objects returned:
          // id
          // title
          // body
          // user_id
          // user {
          //    id
          //    username
          // }
        },
      ],
      // Objects returned should be in descending order of post date
      order: [
        [
          'createdAt',
          'DESC',
        ],
      ],
    });

    const plainObjectPostData = userPostData.map((postItem) => postItem.get({ plain: true }));

    res.status(200).render('dashboard', { plainObjectPostData, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;

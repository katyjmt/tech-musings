const router = require('express').Router();
// Add models required for individual blog page
const { Post, User, Comment } = require('../models');
// Import withAuth middlewear to check if user is logged in before completing request
const { withAuth } = require('./utils/withAuth');

// Route to get data to display post and comments on blog page
router.get('/:pid', withAuth, async (req, res) => {
  try {
    // Find post with specified ID and attach associated user data
    const postItem = await Post.findByPk(req.params.pid, {
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
    });

    const plainObjectPostItem = postItem.get({ plain: true });

    // Find comments with given post ID
    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.pid,
      },
    });

    const plainObjectComments = commentData.map((commentItem) => commentItem.get({ plain: true }));

    res.status(200).render('blog', {
      plainObjectPostItem,
      plainObjectComments,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;

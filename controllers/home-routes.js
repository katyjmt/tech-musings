const router = require('express').Router();
// Add models required for home page
const Post = require('../models/Posts');
const User = require('../models/Users');

// Route to get post and user data to display list of recent posts on home page
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
          // Structure of objects returned:
          // id
          // title
          // body
          // slug
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

    const plainObjectPostData = postData.map((postItem) => postItem.get({ plain: true }));

    res.status(200).render('home', {
      plainObjectPostData,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;

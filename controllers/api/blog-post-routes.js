const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// User creates post => CREATE new post
router.post('/', async (req, res) => {
  try {
    const dbPostData = await Post.create({
      title: req.body.title,
      body: req.body.body,
      // User ID was saved to session when user logged in
      user_id: req.session.userId,
    });

    res.status(200).json(dbPostData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// User edits post => PUT edits into post
router.put('/:id', async (req, res) => {
  try {
    const dbUpdatePostData = await Post.update(
      {
        title: req.body.title,
        body: req.body.body,
      },
      {
        // update record where post id matches id in parameters
        where: {
          id: req.params.id,
        },
      },
    );
    res.status(200).json(dbUpdatePostData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// User deletes post => DELETE post
router.delete('/:id', async (req, res) => {
  try {
    const dbDeletePostData = await Post.destroy(
      {
        // delete record where post id matches id in parameters
        where: {
          id: req.params.id,
        },
      },
    );
    res.status(200).json(dbDeletePostData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// User comments on post => CREATE new comment
router.post('/comment/:pid', async (req, res) => {
  try {
    const dbCommentData = await Comment.create({
      comment: req.body.comment,
      // User ID was saved to session when user logged in
      user_id: req.session.userId,
      // Post ID comes from url params
      post_id: req.params.pid,
    });

    res.status(200).json(dbCommentData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;

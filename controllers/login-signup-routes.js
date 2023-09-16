const router = require('express').Router();

// Route to render login page
router.get('/', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to render signup page
router.get('/signup', async (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

const router = require('express').Router();
const { User } = require('../../models');

// User signs up => CREATE new user:
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      // Save user ID to session object
      req.session.userId = dbUserData.id;
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// User logs in => validate + update loggedIn status
router.post('/login', async (req, res) => {
  try {
    // Find user in db with email that matches the one submitted
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    // If email can't be found, return error message
    if (!dbUserData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again.' });
      return;
    }

    // Use checkPassword (bcrypt - defined in User model) to compare pw with hashed one in db
    const validPassword = await dbUserData.checkPassword(req.body.password);

    // If password isn't valid, return error message
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again.' });
      return;
    }

    // If login success, create sessions boolean variable 'loggedIn' and set to true
    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json({ user: dbUserData, message: 'You\'re now logged in' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// User logs out => update loggedIn status
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      // 204 - server successfuly processed request, no content returned
      res.status(204).end();
    });
  } else {
    // 404 - session with loggedIn status could not be found
    res.status(404).end();
  }
});

module.exports = router;

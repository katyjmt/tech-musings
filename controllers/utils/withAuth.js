// Middlewear to stop user from accessing restricted pages when not logged in
const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  next();
};

module.exports = {
  withAuth,
};

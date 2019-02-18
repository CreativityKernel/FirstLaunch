module.exports = function(app) {
  var auth = require('../controllers/AuthController');

  // user Routes
  app.route('/auth')
    .post(auth.authenticate_user);

};

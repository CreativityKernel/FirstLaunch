module.exports = function(app) {
  var activity = require('../controllers/ActivityController');

  // user Routes
  app.route('/activities')
    .get(activity.list_all_activities)

 app.route('/activities/project/:projectID')
  .get(activity.list_activities)

  app.route('/activities/:activityId')
    .get(activity.read_an_activity)
    .put(activity.update_an_activity)
    .delete(activity.delete_an_activity);
};

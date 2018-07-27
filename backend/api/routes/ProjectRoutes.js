module.exports = function(app) {
  var project = require('../controllers/ProjectController');

  // project Routes
  app.route('/projects')
    .get(project.list_all_projects)
    .post(project.create_a_project);

  app.route('/projects/:projectId')
    .get(project.read_a_project)
    .put(project.update_a_project)
    .delete(project.delete_a_project);

  app.route('/projects/likes/:projectId')
    .post(project.push_likes);

  app.route('/projects/wishes/:projectId')
    .post(project.push_wishes);
};

module.exports = function(app) {
  var idea = require('../controllers/IdeaController');

  // idea Routes
  app.route('/ideas')
    .get(idea.list_all_ideas)
    .post(idea.create_an_idea);

app.route('/ideas/random')
    .get(idea.list_random_ideas)

  app.route('/ideas/:ideaId')
    .get(idea.read_an_idea)
    .put(idea.update_an_idea)
    .delete(idea.delete_an_idea);


};

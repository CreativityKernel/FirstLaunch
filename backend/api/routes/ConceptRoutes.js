module.exports = function(app) {
  var concept = require('../controllers/conceptController');

  // concept Routes
  app.route('/concepts')
    .get(concept.list_all_concepts)
    .post(concept.create_a_concept);


  app.route('/concepts/:conceptId')
    .get(concept.read_a_concept)
    .put(concept.update_a_concept)
    .delete(concept.delete_a_concept);
};

module.exports = function(app) {
  var prompt = require('../controllers/PromptController');

  // prompt Routes
  app.route('/prompts')
    .get(prompt.list_all_prompts)
    .post(prompt.create_a_prompt);


  app.route('/prompts/:promptId')
    .get(prompt.read_a_prompt)
    .put(prompt.update_a_prompt)
    .delete(prompt.delete_a_prompt);
};

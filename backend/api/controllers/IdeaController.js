var mongoose = require('mongoose'),
  Idea = mongoose.model('Ideas'),
  Prompt = mongoose.model('Prompts');

exports.list_all_ideas = function(req, res) {
  Idea.find({}, function(err, idea) {
    if (err)
      res.send(err);
    res.json(idea);
  });
};

exports.list_random_ideas = function(req, res) {
  Idea.findRandom({}, {}, {limit: 96}, function(err, idea) {
    if (err)
      res.send(err);
    res.json(idea);
  });
};

exports.create_an_idea = function(req, res) {
  var new_idea = new Idea(req.body);
  new_idea.save(function(err, idea) {
    if (err)
      res.send(err);
    Prompt.findOneAndUpdate({_id:req.body.Prompt_id},{$push: {Ideas: idea._id}},{new:true},function(err, prompt){
      console.log(err);
      console.log(prompt);
    });
    res.json(idea);
  });
};


exports.read_an_idea = function(req, res) {
  console.log(req.params.ideaId);
  Idea.findById(req.params.ideaId, function(err, idea) {
    if (err)
      res.send(err);
    res.json(idea);
  });
};


exports.update_an_idea = function(req, res) {
  Idea.findOneAndUpdate({_id: req.params.ideaId}, req.body, {new: true}, function(err, idea) {
    if (err)
      res.send(err);
    res.json(idea);
  });
};


exports.delete_an_idea = function(req, res) {
  Idea.remove({
    _id: req.params.ideaId
  }, function(err, idea) {
    if (err)
      res.send(err);
    res.json({ message: 'Idea successfully deleted' });
  });
};

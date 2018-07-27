var mongoose = require('mongoose'),
  Concept = mongoose.model('Concepts');

exports.list_all_concepts = function(req, res) {
  console.log('rsds');
  Concept.find({}, function(err, concept) {
    console.log('rasasds');
    if (err)
      res.send(err);
    res.json(concept);
  });
};




exports.create_a_concept = function(req, res) {
  var new_concept = new Concept(req.body);
  new_concept.save(function(err, concept) {
    if (err)
      res.send(err);
    res.json(concept);
  });
};


exports.read_a_concept = function(req, res) {
  console.log(req.params.conceptId);
  Concept.findById(req.params.conceptId, function(err, concept) {
    if (err)
      res.send(err);
    res.json(concept);
  });
};


exports.update_a_concept = function(req, res) {
  Concept.findOneAndUpdate({_id: req.params.conceptId}, req.body, {new: true}, function(err, concept) {
    if (err)
      res.send(err);
    res.json(concept);
  });
};


exports.delete_a_concept = function(req, res) {
  concept.remove({
    _id: req.params.conceptId
  }, function(err, concept) {
    if (err)
      res.send(err);
    res.json({ message: 'concept successfully deleted' });
  });
};

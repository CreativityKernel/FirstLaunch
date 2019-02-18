var mongoose = require('mongoose'),
  Project = mongoose.model('Projects'),
  activityController = require('../controllers/ActivityController');

exports.list_all_projects = function(req, res) {
  console.log('rsds');
  Project.find({}, function(err, project) {
    if (err)
      res.send(err);
    res.json(project);
    console.log(project);
  }).sort({Created_date:-1}).populate('Users');
};

exports.create_a_project = function(req, res) {
  console.log(req.body);
  var new_project = new Project(req.body);
  new_project.save(function(err, project) {
    if (err)
      res.send(err);
    console.log(project);
    activityController.create_an_activity("Project Created",
        req.body.Author, project._id);
    res.json(project);
  });
};


exports.read_a_project = function(req, res) {
  console.log(req.params.projectId);
  Project.findById(req.params.projectId, function(err, project) {
    if (err)
      res.send(err);
    res.json(project);
  }).populate('Prompts');
};

exports.update_a_project = function(req, res) {
  Project.findOneAndUpdate({_id: req.params.projectId}, req.body, {new: true}, function(err, project) {
    if (err)
      res.send(err);
    res.json(project);
  });
};

exports.delete_a_project = function(req, res) {
  Project.remove({
    _id: req.params.projectId
  }, function(err, project) {
    if (err)
      res.send(err);
    res.json({ message: 'project successfully deleted' });
  });
};

exports.push_likes = function(req, res) {
  console.log(req.body);
  Project.findOneAndUpdate({_id: req.params.projectId}, {$push: {Likes: {$each: req.body.Likes}}}, function(err, project) {
    if (err)
      res.send(err);
    res.json(project);
  });
};

exports.push_wishes = function(req, res) {
  Project.findOneAndUpdate({_id: req.params.projectId}, {$push: {Wishes: {$each: req.body.Wishes}}}, function(err, project) {
    if (err)
      res.send(err);
    res.json(project);
  });
};

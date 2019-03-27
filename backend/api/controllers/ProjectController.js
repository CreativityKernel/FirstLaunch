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
  }).sort({Created_date:-1}).populate('participants').populate('createdBy');
};

exports.create_a_project = function(req, res) {
  console.log(req.body);
  var new_project = new Project(req.body);
  new_project.save(function(err, project) {
    if (err)
      res.send(err);
    console.log(project);
    activityController.create_an_activity("Created Project",
        req.body.createdBy, project._id);
    res.json(project);
  });
};


exports.read_a_project = function(req, res) {
  console.log(req.params.projectId);
  Project.findById(req.params.projectId, function(err, project) {
    if (err)
      res.send(err);
    res.json(project);
  }).populate('participants').populate('createdBy').
  populate('prompts').populate({path:'activities', populate: {path:'user'}});
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
  Project.findOneAndUpdate({_id: req.params.projectId}, {$push: {likes: {$each: req.body.likes}}}, function(err, project) {
    if (err)
      res.send(err);
    if(req.body.likes.length > 0){
      activityController.create_an_activity("generated "+req.body.likes.length+ "Like(s)",
          req.body.createdBy, project._id);
        }
    res.json(project);
  });
};

exports.push_wishes = function(req, res) {
  console.log(req.body);
  Project.findOneAndUpdate({_id: req.params.projectId}, {$push: {wishes: {$each: req.body.wishes}}}, function(err, project) {
    if (err)
      res.send(err);
    if(req.body.wishes.length > 0){
        activityController.create_an_activity("generated "+req.body.wishes.length+" Wishe(s)",
            req.body.createdBy, project._id);
    }
    res.json(project);
  });
};

var mongoose = require('mongoose'),
  Activity = mongoose.model('Activities');

exports.list_activities = function(req, res) {
  console.log('rsds');
  Activity.find({projectId:req.params.projectId}, function(err, activities) {
    if (err)
      res.send(err);
    res.json(activities);
  });
};

exports.list_all_activities = function(req, res) {
  console.log('rsds');
  Activity.find({}, function(err, activities) {
    if (err)
      res.send(err);
    res.json(activities);
  });
};


exports.read_an_activity = function(req, res) {
  Activity.findById(req.params.activityId, function(err, activity) {
    if (err)
      res.send(err);
    res.json(activity);
  });
};


exports.update_an_activity = function(req, res) {
  Activity.findOneAndUpdate({_id: req.params.activityId}, req.body, {new: true}, function(err, activity) {
    if (err)
      res.send(err);
    res.json(activity);
  });
};


exports.delete_an_activity = function(req, res) {
  Activity.remove({
    _id: req.params.activityId
  }, function(err, activity) {
    if (err)
      res.send(err);
    res.json({ message: 'Activity successfully deleted' });
  });
};


exports.create_an_activity = function(message, userId, projectId) {
  console.log("activity");
  var new_activity = new Activity(
    { text:message,
      userId:userId,
      projectId:projectId
    });
  new_activity.save(function(err, activity) {
    if (err)
      return(err);
    console.log(activity);
    return(activity);
  });
};

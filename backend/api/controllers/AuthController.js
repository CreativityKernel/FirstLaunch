var mongoose = require('mongoose'),
  User = mongoose.model('Users');


exports.authenticate_user = function(req, res) {
  var userProfile = req.body;
  console.log(userProfile.googleId);

  User.findOne({googleId: userProfile.googleId}, function(err, user) {
    if (err)
      res.send(err);
    if(!user){
      var new_user = new User(user);
      new_user.save(function(err, user) {
        if (err)
          res.send(err);
        res.json(user);
      });
    }
    console.log(user);
    res.json(user);
  });

};

create_new_user = function(user) {
  var new_user = new User(user);
  new_user.save(function(err, user) {
    if (err)
      return(err);
    console.log("new user created");
    return(user);
  });
};


read_a_user = function(req, res) {
  console.log(req.params.userId);
  User.findById(req.params.userId, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


update_a_user = function(req, res) {
  User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

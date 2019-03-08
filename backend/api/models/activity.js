var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var activitySchema = new Schema({
  task: {
    type: String,
  },

  user:{type: mongoose.Schema.Types.ObjectId, ref: 'Users'},

  project:{type: mongoose.Schema.Types.ObjectId, ref: 'Projects'},

  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Activities', activitySchema);

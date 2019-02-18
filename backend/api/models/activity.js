var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var activitySchema = new Schema({
  text: {
    type: String,
  },

  user:{type: mongoose.Schema.Types.ObjectId, ref: 'Users'},

  projectId:{type: mongoose.Schema.Types.ObjectId, ref: 'Projects'},

  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Activities', activitySchema);

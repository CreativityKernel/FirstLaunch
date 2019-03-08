var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var projectSchema = new Schema({
  title: {
    type: String,
    required: 'Kindly enter the name of the task'
  },

  description: {
    type: String,
  },

  participants: [{type: mongoose.Schema.Types.ObjectId, ref: 'Users'}],

  availableModules:[{type: String}],

  unlockedModules: [{type: String}],

  prompts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Prompts'}],

  wishes: [{type: String}],

  likes: [{type: String}],

  activities: [{type: mongoose.Schema.Types.ObjectId, ref: 'Activities'}],

  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},

  createdDate: {
    type: Date,
    default: Date.now
  },
  projectImage: {
    data: Buffer, contentType: String }
});

module.exports = mongoose.model('Projects', projectSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var projectSchema = new Schema({
  Title: {
    type: String,
    required: 'Kindly enter the name of the task'
  },

  Description: {
    type: String,
  },

  Participants: [{type: mongoose.Schema.Types.ObjectId, ref: 'Users'}],

  Available_Modules:[{type: String}],

  Unlocked_Modules: [{type: String}],

  Prompts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Prompts'}],

  Wishes: [{type: String}],

  Likes: [{type: String}],

  Author: {type:String},

  Created_date: {
    type: Date,
    default: Date.now
  },
  Project_Image: {
    data: Buffer, contentType: String }
});

module.exports = mongoose.model('Projects', projectSchema);

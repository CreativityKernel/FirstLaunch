var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var promptSchema = new Schema({
  text: {
    type: String,
  },

  author: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},

  project: {type: String},

  ideas: [{type: mongoose.Schema.Types.ObjectId, ref: 'ideas'}],

  values: [{type:{type:Number}, text: {type: String}}],

  favorite_ideas: [{type: String}],

  Created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Prompts', promptSchema);

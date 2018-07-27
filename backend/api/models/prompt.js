var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var promptSchema = new Schema({
  Text: {
    type: String,
  },

  Author: {
    type: String,
  },

  Project: {type: String},

  Ideas: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ideas'}],

  Values: [{type: String}],

  Favorite_Ideas: [{type: String}],

  Created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Prompts', promptSchema);

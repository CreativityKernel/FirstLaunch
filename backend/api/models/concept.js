var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var conceptSchema = new Schema({
  Title: {
    type: String,
    required: 'Kindly enter the name of the task'
  },

  Description: {
    type: String,
  },

  Value_Proposition: {
    type: String,
  },

  Sketch: {
    type: String,
  },

  Prompt: [{type: String}],

  Created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Concepts', conceptSchema);

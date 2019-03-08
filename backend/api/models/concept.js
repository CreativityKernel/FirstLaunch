var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var conceptSchema = new Schema({
  title: {
    type: String,
    required: 'Kindly enter the name of the task'
  },

  description: {
    type: String,
  },

  valueProposition: {
    type: String,
  },

  sketch: {
    type: String,
  },

  prompt: [{type: String}],

  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Concepts', conceptSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
  Name: {
    type: String,
  },

  ID_Token: {
    type: String,
  },

  Projects: [{type: String}],

  Ideas: [{type: String}],

  Achivements: [{type: String}],

  Sessions: [{type: String}],

  Values:[{type: String}],

  Created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Users', userSchema);

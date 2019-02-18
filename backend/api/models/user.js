var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
  name: {
    type: String,
  },

  googleI: {
    type: String,
  },

  imageUrl:{
    type: String,
  },

  givenName:{
    type: String,
  },

  familyName:{
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

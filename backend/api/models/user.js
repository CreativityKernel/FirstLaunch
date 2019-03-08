var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
  name: {
    type: String,
  },

  googleId: {
    type: String,
  },

  imageUrl:{
    type: String,
  },

  givenName:{
    type: String,
  },

  familyName:{
    type:String
  },

  projects: [{type: String}],

  ideas: [{type: String}],

  achivements: [{type: String}],

  sessions: [{type: String}],

  values:[{type: String}],

   createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Users', userSchema);

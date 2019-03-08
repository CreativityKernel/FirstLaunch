var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var random = require('mongoose-simple-random');


var ideaSchema = new Schema({
  prompt_id: {
    type: String,
  },
  parent:{
      type: String
  },
  children: [{type: String}],
  author: {
    type:{type: mongoose.Schema.Types.ObjectId, ref: 'Users'}
  },
  content: {
    title: {
      type: String
    },
    description: {
      type: String,
    },
    sketch: {
      type: String
    },
    metaTags:[{key: {type:String}, value: {type:String}}]
  },

  created_date: {
    type: Date,
    default: Date.now
  },
  color: {
    type:Number
  }
});

ideaSchema.plugin(random);

module.exports = mongoose.model('Ideas', ideaSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var random = require('mongoose-simple-random');


var ideaSchema = new Schema({
  Prompt_id: {
    type: String,
  },
  Parent:{
      type: String
  },
  Children: [{type: String}],
  Author: {
    type:String
  },
  Content: {
    Title: {
      type: String
    },
    Description: {
      type: String,
    },
    Sketch: {
      type: String
    },
    MetaTags:[{key: {type:String}, value: {type:String}}]
  },

  Created_date: {
    type: Date,
    default: Date.now
  },
  Color: {
    type:Number
  }
});

ideaSchema.plugin(random);

module.exports = mongoose.model('Ideas', ideaSchema);

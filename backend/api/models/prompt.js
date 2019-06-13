var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var promptSchema = new Schema({
  text: {
    type: String
  },

  author: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },

  project: { type: String },

  ideas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ideas" }],

  values: [{ type: { type: Number }, text: { type: String } }],

  favorite_ideas: [{ type: String }],

  Created_date: {
    type: Date,
    default: Date.now
  },

  votes: {
    type: Map,
    of: [
      {
        user_id: String,
        position: {
          x: Number,
          y: Number
        }
      }
    ]
  }
});

module.exports = mongoose.model("Prompts", promptSchema);

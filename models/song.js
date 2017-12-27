
var mongoose = require("mongoose");

var songSchema = new mongoose.Schema({
    index: Number,
    name: String,
    link: String,
    music: String,
    CreatedAt: { type: Date, default: Date.now },
    author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   notes: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Note"
      }
   ]
});

module.exports = mongoose.model("Song", songSchema);

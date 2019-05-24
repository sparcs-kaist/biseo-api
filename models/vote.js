const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
  _roomId: Schema.Types.ObjectId,
  type: Number,
  title: String,
  description: String,
  startTime: Date,
  is_anonymous: Boolean,
  options: [{option: String, count: Number}],
  users: [{uid: Schema.Types.ObjectId, choice: Number}],
});

module.exports = mongoose.model('vote', voteSchema);

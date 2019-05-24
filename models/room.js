const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  _hostId: Schema.Types.ObjectId,
  is_conf: Boolean,
  is_live: Boolean,
  users: [{uid: Schema.Types.ObjectId, is_present: Boolean}],
});

module.exports = mongoose.model('room', roomSchema);

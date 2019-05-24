const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nickname: String,
  email: String,
  is_admin: Boolean,
  type: Number,
});

module.exports = mongoose.model('user', userSchema);

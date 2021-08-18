const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date,
  ownerTeamId: String,
});
module.exports = mongoose.model('Task', taskSchema);

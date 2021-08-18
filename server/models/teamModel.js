const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date,
  ownerTeamId: String,
});
const teamSchema = new mongoose.Schema({
  name: String,
  description: String,
  members: [{ name: String, isAdmin: Number }],
  tasks: [taskSchema],
});
module.exports = mongoose.model('Team', teamSchema);

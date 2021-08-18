const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-find-or-create');

const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date,
  ownerTeamId: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  tasks: [taskSchema],
  teams: [{ name: String }],
});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);

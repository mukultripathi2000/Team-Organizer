const User = require('../models/userModel');

exports.getUsers = (req, res) => {
  User.find((err, foundUsers) => {
    if (err) {
      res.send(err);
    } else {
      res.json(foundUsers);
    }
  });
};

exports.postUser = (req, res) => {
  const { name, email, password, tasks } = req.body;
  const user = new User({
    name: name,
    email: email,
    password: password,
    tasks: tasks,
  });
  user.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Sucessfully created user');
    }
  });
};

exports.getUserWithId = (req, res) => {
  User.findOne({ _id: req.params.userId }, (err, foundUser) => {
    if (err) {
      res.send(err);
    } else {
      res.json(foundUser);
    }
  });
};
const Team = require('../models/teamModel');

exports.patchUserWithId = async (req, res) => {
  try {
    const { name: newName } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: { name: newName } }
    ).exec();
    const { teams } = user;
    const teamsId = teams.map((team) => team._id);

    await Team.updateMany(
      { _id: teamsId, 'members._id': req.params.userId },
      {
        $set: { 'members.$.name': newName },
      }
    ).exec();
    res.send('Sucessfully edited the user');
  } catch (err) {
    res.send(err);
  }
};

exports.deleteUserWithId = (req, res) => {
  User.deleteOne({ _id: req.params.userId }, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Sucessfully deleted the user');
    }
  });
};

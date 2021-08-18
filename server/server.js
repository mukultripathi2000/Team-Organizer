// jshint esversion:6
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const cors = require('cors');

const app = express();

// App

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: '*'
}));
app.use(
  session({
    secret: 'Secret',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());




// Mongoose connection
//const url = 'mongodb://localhost:27017/TeamOrganzierDB';
const url = process.env.MONGODB_CONNECTION_URL
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false });
mongoose.set('useCreateIndex', true);

// Models
const User = require('./models/userModel');

// Passport connections
passport.use(User.createStrategy());
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});



// Authentication routes
const authRoutes = require('./routes/authRoutes');

app.get('/api/isAuthenticated', authRoutes.isAuthenticated);
app.get('/api/logout', authRoutes.logout);
app.post('/api/register', authRoutes.register);
app.post('/api/login', authRoutes.login);

// Team routes
const teamRoutes = require('./routes/teamRoutes');

app // eslint-disable-next-line prettier/prettier
  .route('/api/teams')
  .get(teamRoutes.getTeams)
  .post(teamRoutes.postTeam);

app
  .route('/api/teams/:teamId')
  .get(teamRoutes.getTeamWithId)
  .patch(teamRoutes.editTeamWithId)
  .delete(teamRoutes.deleteTeamWithId);

app.route('/api/teams/:teamId/name').get(teamRoutes.getTeamNameWithId);

// Task routes
const taskRoutes = require('./routes/taskRoutes');

app
  .route('/api/teams/:teamId/tasks')
  .get(taskRoutes.getTasks)
  .post(taskRoutes.postTask);

app
  .route('/api/teams/:teamId/tasks/:taskId')
  .get(taskRoutes.getTaskWithId)
  .patch(taskRoutes.patchTask)
  .delete(taskRoutes.deleteTaskWithId);

// Member routes
const memberRoutes = require('./routes/memberRoutes');

app
  .route('/api/teams/:teamId/members')
  .get(memberRoutes.getMembers)
  .post(memberRoutes.postMember);

app
  .route('/api/teams/:teamId/members/:memberId')
  .get(memberRoutes.getMemberWithId)
  .delete(memberRoutes.deleteMemberWithId);

app
  .route('/api/teams/:teamId/members/:memberId/admin')
  .patch(memberRoutes.changeMemberAdminStatus);

// User routes
const userRoutes = require('./routes/userRoutes');

app // eslint-disable-next-line prettier/prettier
  .route('/api/users')
  .get(userRoutes.getUsers)
  .post(userRoutes.postUser);

app
  .route('/api/users/:userId')
  .get(userRoutes.getUserWithId)
  .patch(userRoutes.patchUserWithId)
  .delete(userRoutes.deleteUserWithId);




 

app.listen(process.env.PORT || 3080, () => {
  console.log(`Server running`);
});

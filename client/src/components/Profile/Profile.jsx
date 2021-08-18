import React, { useReducer } from 'react';
import './Profile.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import EditProfile from './EditProfile';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { logout, currentUser, refreshUser } = useAuth();
  const { name, username: email, _id: ID } = currentUser;
  const [showEditProfile, toggleShowEditProfile] = useReducer(
    (state) => !state,
    false,
  );

  function handleLogout() {
    logout();
  }
  return (
    <div className="profile">
      <div className="profile-title">
        <h2>My Profile</h2>
        <EditIcon
          className="profile-edit-button"
          onClick={toggleShowEditProfile}
          style={{cursor:'pointer'}}
        />
      </div>
      <div className="profile-pic">
        <AccountCircleIcon fontSize="inherit" />
      </div>
      <h3>Name</h3>
      <p>{name}</p>
      <h3>Email</h3>
      <p>{email}</p>
      <h3>User ID</h3>
      <p>{ID}</p>
      <button className="logout-button" type="button" onClick={handleLogout} style={{cursor:'pointer'}}>
        Log out
      </button>

      {showEditProfile && (
        <EditProfile
          close={toggleShowEditProfile}
          currentUserName={currentUser.name}
          currentUserId={currentUser._id}
          refreshUser={refreshUser}
        />
      )}
    </div>
  );
}

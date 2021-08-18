import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import './Header.css';

import { useAuth } from '../contexts/AuthContext';

function Header() {
  const { url } = useRouteMatch();

  const { logout } = useAuth();

  function handleLogout() {
    logout();
  }

  return (
    <>
      <div className="header">
        <h1 className="links">Team Organizer</h1>
        <Link
          to={`${url}/schedule`}
          className="schedule-link links material-ui-link"
        >
          <h2 className="links">Schedule</h2>
        </Link>
        <Link
          to={`${url}/teams`}
          className="teams-link  links material-ui-link"
        >
          <h2 className="links">Teams</h2>
        </Link>

        <Link
          to={`${url}/profile`}
          className="profile-link links material-ui-link"
        >
          <h2 className="links">Profile</h2>
        </Link>
        <h2 className="links logout-link" type="button" onClick={handleLogout} style={{cursor:'pointer'}}>
        Log out
      </h2>
        </div>
    </>
  );
}

export default Header;

import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function TeamLink({ team, selectTeam }) {
  return (
    <div
      className="team-link"
      style={{cursor:'pointer'}}
      onClick={() => {
        selectTeam(team._id);
      }}
    >
      <AccountCircleIcon className="team-icon" />
      <h4>{team.name}</h4>
    </div>
  );
}
export default TeamLink;

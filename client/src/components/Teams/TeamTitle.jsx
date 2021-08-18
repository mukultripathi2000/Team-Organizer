import React, { useReducer } from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TeamAdd from './TeamAdd';
import CreateTeam from './CreateTeam';
import JoinTeam from './JoinTeam';

function TeamTitle() {
  const [showTeamAdd, toggleShowTeamAdd] = useReducer((state) => !state, false);
  const [showCreateTeam, toggleShowCreateTeam] = useReducer((st) => !st, false);
  const [showJoinTeam, toggleShowJoinTeam] = useReducer((st) => !st, false);
  return (
    <>
      <div className="team-title">
        <h3>My teams</h3>
        <AddCircleOutlineIcon
          onClick={toggleShowTeamAdd}
          className="add-icon"
        />
        {showTeamAdd && (
          <TeamAdd
            toggle={toggleShowTeamAdd}
            toggleCreateTeam={toggleShowCreateTeam}
            toggleJoinTeam={toggleShowJoinTeam}
          />
        )}
      </div>
      {showCreateTeam && <CreateTeam close={toggleShowCreateTeam} />}
      {showJoinTeam && <JoinTeam close={toggleShowJoinTeam} />}
    </>
  );
}
export default TeamTitle;

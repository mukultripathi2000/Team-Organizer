import React, { useReducer } from 'react';
import './Teams.css';
import Button from '@material-ui/core/Button';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import TaskContainer from '../Task/TaskContainer';
import AddTask from '../Task/AddTask';
import MembersContainer from '../Member/MembersContainer';
import AddMember from '../Member/AddMember';
import EditTeam from './EditTeam';
import DeleteTeam from './DeleteTeam';
import LeaveTeam from './LeaveTeam';
import useWindowDimensions from '../extra/WindowDimensions';

function TeamDescription({
  currTeam,
  resetTeams,
  selectTeam,
  userIsAdmin,
  style,
}) {
  

  const { name, description, tasks, members } = currTeam;
  const [showAddTask, toggleShowAddTask] = useReducer((st) => !st, false);
  const [showAddMember, toggleShowAddMember] = useReducer((st) => !st, false);
  const [showEditTeam, toggleShowEditTeam] = useReducer((st) => !st, false);
  const [showDeleteTeam, toggleShowDeleteTeam] = useReducer((st) => !st, false);
  const [showLeaveTeam, toggleShowLeaveTeam] = useReducer((st) => !st, false);
  const { width } = useWindowDimensions();
  const numAdmins = members?.reduce((acc, curr) => acc + curr.isAdmin, 0);
  function refreshTeam() {
    selectTeam(currTeam._id);
  }

  if (!currTeam)
    return (
      <div className="team-content" style={style}>
        <h2>Select a team!</h2>
      </div>
    );

  return (
    <div className="team-content" style={style}>
      <h3>{name}</h3>
      <div className="team-description">
        <p>{description}</p>
      </div>

      <h3>Tasks</h3>
      <TaskContainer
        tasks={tasks}
        teamId={currTeam._id}
        userIsAdmin={userIsAdmin}
        refreshTeam={refreshTeam}
        editable
        style={{ borderRadius: userIsAdmin ? '' : '5px' }}
      />
      {userIsAdmin && (
        <div
          className="add-task"
          onClick={toggleShowAddTask}
          style={tasks && tasks.length ? {} : { borderRadius: '5px' }}
        >
          <LibraryAddIcon className="blue-icon" />
          <h5>Add new task</h5>
        </div>
      )}
      <h3>Members</h3>
      <MembersContainer
        members={members}
        teamId={currTeam._id}
        userIsAdmin={userIsAdmin}
        numAdmins={numAdmins}
        refreshTeam={refreshTeam}
        style={{ borderRadius: userIsAdmin ? '' : '5px' }}
      />
      {userIsAdmin && (
        <div
          className="add-member"
          onClick={toggleShowAddMember}
          style={members && members.length ? {} : { borderRadius: '5px' }}
        >
          <PersonAddIcon style={{ color: '00adb5' }} />
          <h5>Add new member</h5>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        {userIsAdmin && (
          <>
            <div className="team-edit-buttons">
              <Button variant="outlined" onClick={toggleShowEditTeam}>
                Edit Team
              </Button>
            </div>

            <div className="team-edit-buttons">
              <Button
                variant="outlined"
                color="secondary"
                onClick={toggleShowDeleteTeam}
              >
                Delete Team
              </Button>
            </div>
          </>
        )}
        <div className="team-edit-buttons">
          <Button
            variant="outlined"
            color="secondary"
            onClick={toggleShowLeaveTeam}
          >
            Leave Team
          </Button>
        </div>
      </div>
      {showAddTask && (
        <AddTask
          close={toggleShowAddTask}
          currTeam={currTeam}
          refreshTeam={refreshTeam}
        />
      )}

      {showAddMember && (
        <AddMember
          close={toggleShowAddMember}
          currTeam={currTeam}
          refreshTeam={refreshTeam}
        />
      )}
      {showEditTeam && (
        <EditTeam
          close={toggleShowEditTeam}
          currTeam={currTeam}
          refreshTeam={refreshTeam}
        />
      )}
      {showDeleteTeam && (
        <DeleteTeam
          close={toggleShowDeleteTeam}
          resetTeams={resetTeams}
          currTeam={currTeam}
        />
      )}
      {showLeaveTeam && (
        <LeaveTeam
          close={toggleShowLeaveTeam}
          currTeam={currTeam}
          resetTeams={resetTeams}
          lastAdmin={numAdmins === 1}
        />
      )}
      {width <= 700 && (
        <h2 className="responsive-teams-button" onClick={resetTeams}>
          Teams
        </h2>
      )}
    </div>
  );
}
export default TeamDescription;

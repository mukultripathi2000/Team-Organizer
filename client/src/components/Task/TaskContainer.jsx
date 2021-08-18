import React from 'react';
import Task from './Task';
import { deleteTaskForTeam } from '../../request/teams';
import { useAuth } from '../contexts/AuthContext';

export default function TaskContainer({
  tasks,
  style,
  teamId,
  refreshTeam,
  editable,
  userIsAdmin,
  taskEditMode,
}) {
  const { refreshUser } = useAuth();
  async function deleteTask(taskId) {
    try {
      await deleteTaskForTeam(teamId, taskId);
      await refreshUser();
      await refreshTeam();
    } catch (err) {
      console.log(err);
    }
  }
  tasks.sort((task1, task2) => {
    if (task1.date == null) return 1;
    if (task2.date == null) return -1;
    if (task1.date < task2.date) return -1;
    if (task1.date > task2.date) return 1;
    return 0;
  });
  return (
    <div className="tasks-container" style={style}>
      {tasks.map((task, idx) => (
        <div key={task._id}>
          {idx !== 0 && <hr className="dark-separator-line" />}
          <Task
            task={task}
            teamId={teamId}
            userIsAdmin={userIsAdmin}
            refreshTeam={refreshTeam}
            deleteTask={deleteTask}
            taskEditMode={taskEditMode}
            editable={editable}
          />
        </div>
      ))}
    </div>
  );
}

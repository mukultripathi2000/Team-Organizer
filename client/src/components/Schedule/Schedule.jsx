import React from 'react';
import './Schedule.css';
import { useAuth } from '../contexts/AuthContext';
import TaskContainer from '../Task/TaskContainer';

function Schedule() {
  const { currentUser } = useAuth();
  const { tasks } = currentUser;
  return (
    <div className="schedule">
      {tasks.length > 0 ? (
        <>
          <h1 style={{ textAlign: "center" }}>{"Welcome, "}{currentUser.name}</h1>
          <h2> Your Tasks</h2>
          
          <TaskContainer
            tasks={tasks}
            style={{ borderRadius: '5px', width: '100%' }}
          />
        </>
      ) : (
        // eslint-disable-next-line react/jsx-curly-brace-presence
        <h2>{"You don't have any tasks"}</h2>
      )}
    </div>
  );
}

export default Schedule;

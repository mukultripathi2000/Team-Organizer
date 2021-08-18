import React, { useState, useReducer, useRef, useEffect } from 'react';
import moment from 'moment';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import { editTaskForTeam } from '../../request/teams';
import Popup from '../extra/Popup';
import { useAuth } from '../contexts/AuthContext';

function formReducer(state, event) {
  return {
    ...state,
    [event.name]: event.value,
  };
}
export default function EditTask({ close, teamId, refreshTeam, task }) {
  const [formData, setFormData] = useReducer(formReducer, {
    name: task.name,
    description: task.description,
    date: moment(task.date).format('YYYY-MM-DDTHH:mm:ss'),
    changeDate: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { refreshUser } = useAuth();
  const mounted = useRef(false);
  console.log(formData.date);
  async function handleSubmit(event) {
    event.preventDefault();

    if (formData.name && formData.name.length > 50) {
      return setError('Name too long');
    }
    try {
      setError('');
      setLoading(true);
      const taskData = {
        ...formData,
        date: formData.date ? moment(formData.date).toISOString() : '',
      };
      // create task and give teamId
      const res = await editTaskForTeam(teamId, task._id, taskData);
      if (!res.ok) throw new Error();
      await close();
      await refreshTeam();
      await refreshUser();
    } catch (err) {
      setError('Failed to edit task');
    }
    if (mounted.current) {
      setLoading(false);
    }
  }
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  });
  function handleChange(event) {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  }
  return (
    <Popup close={close}>
      <h2>Edit Task</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          <p>Name</p>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            placeholder="Leave blank for no changes"
          />
        </label>
        <label htmlFor="description">
          <p>Description</p>
          <textarea
            type="text"
            id="description"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            placeholder="Leave blank for no changes"
          />
        </label>
        <label htmlFor="date">
          <p>Expected date</p>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={formData.date || ''}
            onChange={handleChange}
            min="2020-01-01"
            max="2022-01-01"
          />
        </label>
        <button className="blue-submit-button" type="submit">
          Edit task
        </button>
      </form>
      <br />
      {loading && <LinearProgress style={{ backgroundColor: '#0000' }} />}
      {error && <Alert severity="error">{error}</Alert>}
    </Popup>
  );
}

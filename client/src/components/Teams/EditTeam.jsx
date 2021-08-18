import React, { useState, useReducer, useRef, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import Popup from '../extra/Popup';
import { editTeam } from '../../request/teams';
import { useAuth } from '../contexts/AuthContext';

function formReducer(state, event) {
  return {
    ...state,
    [event.name]: event.value,
  };
}
export default function EditTeam({ close, currTeam, refreshTeam }) {
  const [formData, setFormData] = useReducer(formReducer, currTeam);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const mounted = useRef(false);
  const { refreshUser } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    if (formData.name && formData.name.length >= 40) {
      return setError('Name too long');
    }
    try {
      setError('');
      setLoading(true);
      // create team and add user to team
      const res = await editTeam(formData, currTeam._id);
      if (!res.ok) throw new Error();
      await close();
      await refreshUser();
      await refreshTeam();
    } catch {
      setError('Failed to create team');
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
      <h2>Edit Team</h2>

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
        <button className="blue-submit-button" type="submit">
          Edit
        </button>
      </form>
      <br />
      {loading && <LinearProgress style={{ backgroundColor: '#0000' }} />}
      {error && <Alert severity="error">{error}</Alert>}
    </Popup>
  );
}

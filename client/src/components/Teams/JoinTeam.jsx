/* eslint-disable react/jsx-curly-brace-presence */
import React, { useState, useReducer, useRef, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import { addMember } from '../../request/teams';
import { useAuth } from '../contexts/AuthContext';
import Popup from '../extra/Popup';

function formReducer(state, event) {
  return {
    ...state,
    [event.name]: event.value,
  };
}
export default function JoinTeam({ close }) {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser, refreshUser } = useAuth();
  const mounted = useRef(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!formData.teamId) {
      return setError('Empty field not allowed');
    }
    try {
      setError('');
      setLoading(true);
      // join team
      const res = await addMember(formData.teamId, currentUser);
      if (!res.ok) throw new Error();
      await close();
      await refreshUser();
    } catch {
      setError('Failed to join the team!');
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
      <h2>Join a Team</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="teamId">
          <p>{"Team's ID"}</p>
          <input
            type="text"
            id="teamId"
            name="teamId"
            value={formData.teamId || ''}
            onChange={handleChange}
          />
        </label>
        <button className="blue-submit-button" type="submit">
          Join
        </button>
      </form>
      <br />
      {loading && <LinearProgress style={{ backgroundColor: '#0000' }} />}
      {error && <Alert severity="error">{error}</Alert>}
    </Popup>
  );
}

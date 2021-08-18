/* eslint-disable react/jsx-curly-brace-presence */
import React, { useState, useReducer, useRef, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import { getUserWithId } from '../../request/auth';
import { addMember } from '../../request/teams';
import Popup from '../extra/Popup';

function formReducer(state, event) {
  return {
    ...state,
    [event.name]: event.value,
  };
}
export default function AddTask({ close, currTeam, refreshTeam }) {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const mounted = useRef(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!formData.id) {
      return setError('Empty field not allowed');
    }
    try {
      setError('');
      setLoading(true);
      // Add member to team with id == TeamId
      const userToAdd = await getUserWithId(formData.id);
      if (!userToAdd._id) throw new Error("User doesn't exist");
      const res = await addMember(currTeam._id, userToAdd);
      if (!res.ok) throw new Error();
      await close();
      await refreshTeam();
    } catch (err) {
      if (err.message === "User doesn't exist") setError(err.message);
      else setError('Failed to add new member');
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
      <h2>Add new member</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="id">
          <p>{"Add member with User's ID"}</p>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id || ''}
            onChange={handleChange}
          />
        </label>
        <button className="blue-submit-button" type="submit">
          Add member
        </button>
        <p>{"Or send him this team's ID"}</p>
        <div className="add-member-team-id">{currTeam._id}</div>
      </form>

      <br />
      {loading && <LinearProgress style={{ backgroundColor: '#0000' }} />}
      {error && <Alert severity="error">{error}</Alert>}
    </Popup>
  );
}

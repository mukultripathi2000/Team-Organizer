import React, { useState, useEffect, useRef } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import Popup from '../extra/Popup';
import { updateUser } from '../../request/user';

export default function EditProfile({
  close,
  currentUserName,
  currentUserId,
  refreshUser,
}) {
  const [name, setUsername] = useState(currentUserName);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const mounted = useRef(false);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setError('');
      setLoading(true);
      // call function to edit user
      const res = await updateUser(currentUserId, name);
      if (!res.ok) throw new Error();
      await close();
      await refreshUser();
    } catch (err) {
      setError('Failed to edit user');
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
    setUsername(event.target.value);
  }

  return (
    <Popup close={close}>
      <h2>Edit user</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          <p>Name</p>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </label>
        <button className="blue-submit-button" type="submit">
          Edit user
        </button>
      </form>

      <br />
      {loading && <LinearProgress style={{ backgroundColor: '#0000' }} />}
      {error && <Alert severity="error">{error}</Alert>}
    </Popup>
  );
}

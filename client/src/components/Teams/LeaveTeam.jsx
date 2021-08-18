import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import Popup from '../extra/Popup';
import { useAuth } from '../contexts/AuthContext';
import { removeMember, deleteTeam } from '../../request/teams';

export default function LeaveTeam({ close, currTeam, resetTeams, lastAdmin }) {
  const { currentUser } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const mounted = useRef(false);

  async function handleSubmit() {
    try {
      setError('');
      setLoading(true);
      // Delete team with teamId : currTeam._id
      if (lastAdmin) await deleteTeam(currTeam._id);
      else await removeMember(currTeam._id, currentUser._id);
      await close();
      await resetTeams();
    } catch (err) {
      setError('Failed to leave team');
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
  return (
    <Popup close={close}>
      <form onSubmit={handleSubmit}>
        <h3>{`Leave "${currTeam.name}"?`}</h3>
        <p>All tasks will be deleted for you</p>

        <Button
          variant="outlined"
          color="secondary"
          className="red-submit-button"
          type="submit"
        >
          Yes, leave team
        </Button>
        {lastAdmin && (
          <p className="red-icon">
            You are the last member of the team, if you leave the team will be
            deleted
          </p>
        )}
      </form>
      {loading && <LinearProgress style={{ backgroundColor: '#0000' }} />}
      {error && <Alert severity="error">{error}</Alert>}
    </Popup>
  );
}

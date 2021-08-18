import React, { useState, useEffect } from 'react';
import TeamNav from './TeamNav';
import TeamDescription from './TeamDescription';
import { useAuth } from '../contexts/AuthContext';
import { getTeam } from '../../request/teams';
import useWindowDimensions from '../extra/WindowDimensions';

function Teams() {
  const [currTeam, setCurrTeam] = useState('');
  const { width } = useWindowDimensions();
  const { currentUser } = useAuth();
  const { teams } = currentUser;
  const userIsAdmin = currTeam
    ? currTeam.members.find((member) => member._id === currentUser._id)
        .isAdmin === 1
    : 0;

  const [responsiveStyleNav, setResponsiveStyleNav] = useState({
    minWidth: '100%',
    maxWidth: '100%',
    display: 'block',
  });
  const [responsiveStyleDesc, setResponsiveStyleDesc] = useState({
    display: 'none',
  });

  useEffect(() => {
    if (width <= 700) {
      // currTeam existe
      if (currTeam) {
        setResponsiveStyleNav({
          display: 'none',
        });
        setResponsiveStyleDesc({
          display: 'block',
        });
      } else {
        setResponsiveStyleNav({
          minWidth: '100%',
          maxWidth: '100%',
          display: 'block',
        });
        setResponsiveStyleDesc({
          display: 'none',
        });
      }
    } else {
      setResponsiveStyleNav({
        minWidth: '210px',
        maxWidth: '210px',
        display: 'block',
      });
      setResponsiveStyleDesc({
        display: 'block',
      });
    }
  }, [currTeam, width]);

  async function selectTeam(teamId) {
    // Call function that will get the team with id = teamId
    const resTeam = await getTeam(teamId);
    setCurrTeam(resTeam);
  }

  return (
    <div className="teams-container">
      <TeamNav
        teams={teams}
        selectTeam={selectTeam}
        style={responsiveStyleNav}
      />
      <TeamDescription
        currTeam={currTeam}
        selectTeam={selectTeam}
        style={responsiveStyleDesc}
        resetTeams={() => {
          setCurrTeam('');
        }}
        userIsAdmin={userIsAdmin}
      />
    </div>
  );
}

export default Teams;

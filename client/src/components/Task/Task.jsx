/* eslint-disable no-lonely-if */
import React, { useState, useReducer, useEffect, useRef } from 'react';
import './Task.css';
import moment from 'moment';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import CheckIcon from '@material-ui/icons/Check';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import RestoreIcon from '@material-ui/icons/Restore';
import EditIcon from '@material-ui/icons/Edit';
import EditTask from './EditTask';
import useWindowDimensions from '../extra/WindowDimensions';
import { getTeamNameWithId } from '../../request/teams';

export default function Task({
  task,
  teamId,
  refreshTeam,
  editable,
  deleteTask,
  userIsAdmin,
}) {
  const {
    _id: taskId,
    name,
    description,
    date: stringDate,
    ownerTeamId,
  } = task;
  const [ownerTeamName, setOwnerTeamName] = useState('');
  const { width } = useWindowDimensions();
  const [responsiveStyle, setResponsiveStyle] = useState();
  const [showArrow, setShowArrow] = useState(false);
  const [dropDescrip, setDropDescrip] = useReducer((st) => !st, false);
  const [isDone, toggleIsDone] = useReducer((st) => !st, false);
  const [showEditTask, toggleShowEditTask] = useReducer((st) => !st, false);
  const showOptions =
    (editable && width > 700) || (width <= 700 && dropDescrip && editable);
  const date = stringDate ? new Date(stringDate) : '';
  const pastDate = date < new Date();

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    if (!editable) {
      if (width <= 700) {
        setResponsiveStyle({
          gridTemplateColumns: `50px 5fr ${date ? '30px 130px' : ''}`,
          gridTemplateRows: dropDescrip
            ? 'minmax(2.5rem, auto) 2rem  auto'
            : 'minmax(2.5rem, auto) auto',
        });
      } else {
        setResponsiveStyle({
          gridTemplateColumns: `50px 5fr 1fr ${date ? '30px 160px' : ''}`,
          gridTemplateRows: dropDescrip
            ? 'minmax(2.5rem, auto) 2rem  auto'
            : 'minmax(2.5rem, auto) auto',
        });
      }
    } else {
      if (width <= 700) {
        setResponsiveStyle({
          gridTemplateColumns: dropDescrip
            ? '50px 5fr 40px'
            : `50px 5fr ${date ? '40px 130px' : ''}`,
          gridTemplateRows: dropDescrip
            ? 'minmax(2.5rem, auto) 2rem  auto'
            : 'minmax(2.5rem, auto) auto',
        });
      } else {
        setResponsiveStyle({
          gridTemplateColumns: `50px 5fr ${date ? '50px 160px' : ''} 50px`,
          gridTemplateRows: 'minmax(2.5rem, auto) auto',
        });
      }
    }
  }, [width, dropDescrip, stringDate,editable]);

  const [nameStyle, setNameStyle] = useState();
  useEffect(() => {
    if (dropDescrip && editable && width <= 700)
      setNameStyle({ gridColumn: '2/7' });
    else if (dropDescrip && !editable && width > 700)
      setNameStyle({ gridColumn: '2/4' });
    else setNameStyle({ gridColumn: '2/3' });
  }, [width, dropDescrip,editable]);

  useEffect(async () => {
    setOwnerTeamName(await getTeamNameWithId(ownerTeamId));
  }, [ownerTeamId]);

  const timeoutId = useRef('');
  const intervalId = useRef('');
  const [opacity, setOpacity] = useState(1);
  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, []);

  function cancelDelete() {
    clearTimeout(timeoutId.current);
    clearInterval(intervalId.current);
    setOpacity(1);
  }

  function callForDelete() {
    intervalId.current = setInterval(() => {
      setOpacity((prevOpacity) => prevOpacity - 0.025);
    }, 50);
    timeoutId.current = setTimeout(() => {
      deleteTask(taskId);
    }, 2000);
  }
  return (
    <>
      
      


      
   
      



      <div
        className="task"
        onMouseOver={() => setShowArrow(true)}
        onMouseOut={() => setShowArrow(false)}
        onClick={() => setDropDescrip(true)}
        style={{ ...responsiveStyle, opacity }}
      >
        {showArrow || dropDescrip ? (
          <>
            {dropDescrip ? (
              <>
                {editable ? (
                  <EditIcon
                    className="task-button blue-icon"
                    onMouseOver={(e) => e.stopPropagation()}
                    onMouseOut={(e) => e.stopPropagation()}
                    onClick={async (e) => {
                      e.stopPropagation();
                      toggleShowEditTask();
                    }}
                  />
                ) : (
                  <ArrowDropUpIcon />
                )}
              </>
            ) : (
              <ArrowDropDownIcon />
            )}
          </>
        ) : (
          <>
            {isDone ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
          </>
        )}
        <h4 style={nameStyle}>{name}</h4>
        {width > 700 && !editable && !dropDescrip && (
          <p className="task-team-name">{ownerTeamName}</p>
        )}
        {(date || (editable && dropDescrip && width <= 700)) && (
          <>
            <CalendarTodayIcon />
            <h5
              style={{
                color: pastDate && date ? '#e84545' : 'white',
              }}
            >
              {date ? (
                moment(date).calendar(null, {
                  sameElse: 'Do MMM  YYYY, h:mm a',
                })
              ) : (
                <p style={{ opacity: '0.5' }}>No date</p>
              )}
            </h5>
          </>
        )}
        {showOptions && userIsAdmin && (
          <>
            {!isDone ? (
              <CheckIcon
                className="task-button blue-icon"
                onMouseOver={(e) => e.stopPropagation()}
                onMouseOut={(e) => e.stopPropagation()}
                onClick={async (e) => {
                  e.stopPropagation();
                  toggleIsDone();
                  callForDelete();
                }}
              />
            ) : (
              <RestoreIcon
                className="task-button red-icon"
                onMouseOver={(e) => e.stopPropagation()}
                onMouseOut={(e) => e.stopPropagation()}
                onClick={async (e) => {
                  e.stopPropagation();
                  toggleIsDone();
                  cancelDelete();
                }}
              />
            )}
          </>
        )}
        {dropDescrip && !editable && (
          <p style={{ gridColumn: '1/7' }}>{ownerTeamName}</p>
        )}
        {dropDescrip && (
          <div
            className="task-description"
            style={{ color: description ? 'white' : 'gray' }}
          >
            <p>{description ?? 'No description'}</p>
          </div>
        )}
      </div>
      {showEditTask && (
        <EditTask
          task={task}
          teamId={teamId}
          refreshTeam={refreshTeam}
          close={toggleShowEditTask}
        />
      )}
    </>
  );
}

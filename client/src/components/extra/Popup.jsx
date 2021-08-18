import React from 'react';
import './Extra.css';
import CloseIcon from '@material-ui/icons/Close';

export default function Popup({ children, close }) {
  return (
    <div className="popup-out" onMouseDown={close}>
      <div className="popup-in form" onMouseDown={(e) => e.stopPropagation()}>
        <CloseIcon className="popup-close-icon" onClick={close} />
        {children}
      </div>
    </div>
  );
}

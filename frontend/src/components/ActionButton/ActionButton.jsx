import React from 'react';
import './ActionButton.css';

const ActionButton = ({ color, text, onClick }) => {
  return (
    <button
      className="action-button"
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ActionButton;
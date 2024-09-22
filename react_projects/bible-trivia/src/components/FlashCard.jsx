

import React from 'react';

const FlashCard = ({name, isDisabled, onStartQuiz, color }) => {
  return (
    <button
      onClick={onStartQuiz}
      disabled={isDisabled}
      style={{
        fontWeight: 'bold',
        fontSize: '0.9rem', 
        marginTop: '5px',
        padding: '10px 20px',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        backgroundColor: isDisabled ? '#ccc' : color,
        color: 'white',
        border: 'none',
        borderRadius: '4px',
      }}
    >
      {name}
    </button>
  );
};

export default FlashCard;


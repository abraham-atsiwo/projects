import React from 'react';

import './styles/selectBook.css'

const NumberInput = ({ numberOfQuestions, onNumberChange, error , questions}) => {
  return (
    <div className='book-dropdown-container'>
      <label className='book-label'>
        Number of Questions: 
        <input className='book-select'
          type="number"
          min="1"
          // disabled={true}
          value={numberOfQuestions}
          onChange={(e) => onNumberChange(e.target.value)}
          placeholder="Enter number of questions"
          style={{
            marginLeft: '10px',
            padding: '5px',
            borderRadius: '4px',
            border: error ? '1px solid red' : '1px solid #ccc',
          }}
        />
      </label>
      {error && <p style={{ color: 'red', marginTop: '5px' }}>{error}</p>}
    </div>
  );
};

export default NumberInput;
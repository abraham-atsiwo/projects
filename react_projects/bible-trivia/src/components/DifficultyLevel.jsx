// src/components/DifficultyLevelDropdown.js
import React from 'react';

import './styles/selectBook.css'

const DifficultyLevel = ({ difficultyLevel, onDifficultyChange }) => {
  return (
    <div className='book-dropdown-container'>
      <label className='book-label'>
        Difficulty Level:
        <select className='book-select'
          value={difficultyLevel}
          onChange={(e) => onDifficultyChange(e.target.value)}
          style={{ marginLeft: '10px', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">--Select Difficulty--</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="all">All</option>
        </select>
      </label>
    </div>
  );
};

export default DifficultyLevel;
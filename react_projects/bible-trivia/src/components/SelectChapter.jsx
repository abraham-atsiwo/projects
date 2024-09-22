import React from 'react';

const SelectChapter = ({ chapters, selectedChapter, onChapterChange }) => {
  // // Flexbox container to align the label and dropdown
  // const containerStyle = {
  //   display: 'flex',
  //   alignItems: 'center',  // Align label and dropdown vertically
  //   marginBottom: '20px',  // Add some margin below the dropdown
  // };

  // // Style for the label to add spacing between the label and dropdown
  // const labelStyle = {
  //   marginRight: '15px',  // Add space between the label and dropdown
  //   fontSize: '16px',
  //   fontWeight: 'bold',
  // };

  // // Style for the dropdown (select element)
  // const selectStyle = {
  //   padding: '8px', // Adds padding inside the dropdown
  //   borderRadius: '4px',
  //   border: '1px solid #ccc',
  //   fontSize: '14px',
  // };

  return (
    <div className='book-dropdown-container'>
      <label className='book-label'>
        Chapter:
      </label>
      <select className='book-select' value={selectedChapter} onChange={(e) => onChapterChange(e.target.value)}>
        <option value="">--Select Chapter--</option>
        {chapters.map((chapter, index) => (
          <option key={index} value={chapter.name}>
            {chapter.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectChapter;
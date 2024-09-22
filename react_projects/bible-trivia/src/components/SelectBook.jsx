import React from 'react';

const SelectBook = ({ books, selectedBook, onBookChange }) => {
  // // Flexbox container to ensure label and dropdown are aligned
  // const containerStyle = {
  //   display: 'flex',
  //   alignItems: 'center', // Ensures vertical alignment of label and select
  //   marginBottom: '20px', // Adds some margin below the dropdown
  // };

  // // Style for the label to add spacing between the label and dropdown
  // const labelStyle = {
  //   marginRight: '15px', // This creates space between the label and dropdown
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
        Category:
      </label>
      <select className='book-select' value={selectedBook} onChange={(e) => onBookChange(e.target.value)}>
        <option value="">--Select Book--</option>
        {books.map((book, index) => (
          <option key={index} value={book.name}>
            {book.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBook;

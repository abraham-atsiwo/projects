import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const FlashCardList = ({ questions }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [questionsPerPage, setQuestionsPerPage] = useState(2); // Default value is 3
  const [flippedCards, setFlippedCards] = useState({}); // Track flip state for each card

  const totalQuestions = questions.length;
  const totalPages = Math.ceil(totalQuestions / questionsPerPage);

  // Get the current set of questions
  const currentQuestions = questions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  // Handle next and previous page
  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      resetFlippedCards(); // Reset flip state when moving to the next set of cards
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      resetFlippedCards(); // Reset flip state when moving to the previous set of cards
    }
  };

  // Handle flipping individual cards
  const handleFlip = (index) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle flip state for the specific card
    }));
  };

  // Reset all flipped cards (unflip all cards) when navigating between pages
  const resetFlippedCards = () => {
    setFlippedCards({});
  };

  return (
    <div>
      {/* Input box for number of questions per page */}
      <label style={{paddingLeft: '20px'}}>
        Questions per View:
        <input
          type="number"
          value={questionsPerPage}
          disabled={true}
          min="1"
          max={totalQuestions}
          onChange={(e) => setQuestionsPerPage(Math.min(Math.max(1, e.target.value), totalQuestions))}
          style={{ marginLeft: '10px', padding: '5px', width: '50px' }}
        />
      </label>

      <div className="question-list">
        {currentQuestions.map((question, index) => (
          <QuestionCard
            key={index}
            questionData={question}
            isFlipped={flippedCards[index]} // Pass flip state for the card
            onFlip={() => handleFlip(index)} // Pass flip handler for the card
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="navigation">
        <button onClick={goToPreviousPage} disabled={currentPage === 0}>
          <FontAwesomeIcon icon={faArrowLeft} /> Previous
        </button>
        <button onClick={goToNextPage} disabled={currentPage === totalPages - 1}>
          Next <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default FlashCardList ;
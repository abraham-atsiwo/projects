import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faCheck, faDotCircle } from '@fortawesome/free-solid-svg-icons'; // Import icons

import './styles/QuestionCard.css';  // We'll add some CSS to handle flipping

const QuestionCard = ({ questionData, isFlipped, onFlip }) => {
  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onFlip}>
      {!isFlipped ? (
        <div className="front">
          <div>
            <FontAwesomeIcon icon={faQuestionCircle} style={{ marginRight: '10px' }} />
            {questionData.question}
            {questionData.hint && (
            <p className="hint-text">
              <strong>Hint (Bible Verse):</strong> {questionData.hint}
            </p>
          )}
          </div>
          <ul className="option-list">
            {questionData.options.map((option, index) => (
              <li key={index}>
                <FontAwesomeIcon icon={faDotCircle} style={{ marginRight: '5px' }} />
                {option}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="back">
          <div>
            <FontAwesomeIcon icon={faCheck} style={{ marginRight: '10px' }} />
            {/* Correct Answer */}
          </div>
          <p>{questionData.answer}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
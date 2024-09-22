import React, { useState } from 'react';
import './styles/quizList.css';

const QuizList = ({ filteredData }) => {
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [questionsToShow, setQuestionsToShow] = useState(1); // Default number of questions to show
  const [currentIndex, setCurrentIndex] = useState(0); // For navigation

  // Handle the radio button selection for each question
  const handleOptionChange = (questionId, selectedOption) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: selectedOption,
    });
  };

  // Handle quiz submission
  const handleSubmit = () => {
    let correctAnswers = 0;
    filteredData.forEach((question) => {
      if (userAnswers[question.id] === question.answer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setSubmitted(true);
  };

  // Reset the quiz to its initial state
  const resetQuiz = () => {
    setUserAnswers({});
    setSubmitted(false);
    setScore(0);
    setCurrentIndex(0);
  };

  // Handle change in the number of questions to show
  const handleQuestionCountChange = (event) => {
    setQuestionsToShow(Number(event.target.value));
    setCurrentIndex("");
  };

  // Handle moving to the next set of questions
  const handleNext = () => {
    if (currentIndex + questionsToShow < filteredData.length) {
      setCurrentIndex(currentIndex + questionsToShow);
    }
  };

  // Handle moving back to the previous set of questions
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - questionsToShow);
    }
  };

  // If no questions are available
  if (!filteredData || !Array.isArray(filteredData) || filteredData.length === 0) {
    return <div>No questions available</div>;
  }

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Practice Quiz</h1>

      {/* Control to select the number of questions to display */}
      <div className="question-controls">
        <label htmlFor="questions-to-show">Number of questions to show:</label>
        <input
          id="questions-to-show"
          type="number"
          min="1"
          disabled={true}
          max={filteredData.length}
          value={questionsToShow}
          onChange={handleQuestionCountChange}
          className="question-count-input"
        />
      </div>

      {/* Loop through the questions to show */}
      {filteredData.slice(currentIndex, currentIndex + questionsToShow).map((question) => (
        <div key={question.id} className="quiz-question">
          <h3 className="question-text">{question.question}</h3>

          {/* Display the hint if available */}
          {question.hint && (
            <p className="hint-text">
              <strong>Hint (Bible Verse):</strong> {question.hint}
            </p>
          )}

          {/* Display the answer options */}
          <ul className="options-list">
            {question.options.map((option, i) => (
              <li key={i} className="option-item">
                <label>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    checked={userAnswers[question.id] === option} // Keep the radio checked for the selected answer
                    onChange={() => handleOptionChange(question.id, option)} // Handle radio selection
                    disabled={submitted} // Disable the radio buttons after submission
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>

          {/* Show the correct and selected answer after submission */}
          {submitted && (
            <div className="answer-section">
              <p className="selected-answer">
                <strong>Your Answer:</strong> {userAnswers[question.id] || 'No answer selected'}
              </p>
              <p className="correct-answer">
                <strong>Correct Answer:</strong> {question.answer}
              </p>
            </div>
          )}
        </div>
      ))}

      {/* Navigation buttons */}
      <div className="navigation-buttons">
        <button className="prev-btn" onClick={handlePrev} disabled={currentIndex === 0}>
          &larr; Previous
        </button>
        <button
          className="next-btn"
          onClick={handleNext}
          disabled={currentIndex + questionsToShow >= filteredData.length}
        >
          Next &rarr;
        </button>
      </div>

      {/* Submit or reset the quiz */}
      {!submitted ? (
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Quiz
        </button>
      ) : (
        <div className="result-section">
          <p className="score-text">
            You scored {score} out of {filteredData.length}
          </p>
          <button className="reset-btn" onClick={resetQuiz}>
            Reset Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizList;
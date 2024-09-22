import React, { useState } from 'react';
import './styles/quizList.css'

const QuizList = ({ filteredData }) => {
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [questionsToShow, setQuestionsToShow] = useState(1); // Default number of questions to show
  const [currentIndex, setCurrentIndex] = useState(0); // For navigation

  const handleOptionChange = (questionId, selectedOption) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: selectedOption,
    });
  };

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

  const resetQuiz = () => {
    setUserAnswers({});
    setSubmitted(false);
    setScore(0);
    setCurrentIndex(0);
  };

  const handleQuestionCountChange = (event) => {
    setQuestionsToShow(Number(event.target.value));
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (currentIndex + questionsToShow < filteredData.length) {
      setCurrentIndex(currentIndex + questionsToShow);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - questionsToShow);
    }
  };

  if (!filteredData || !Array.isArray(filteredData) || filteredData.length === 0) {
    return <div>No questions available</div>;
  }

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Practive Quiz: {filteredData.book}</h1>
      <div className="question-controls">
        <label htmlFor="questions-to-show">Number of questions to show:</label>
        <input
          id="questions-to-show"
          type="number"
          min="1"
          max={filteredData.length}
          value={questionsToShow}
          onChange={handleQuestionCountChange}
          className="question-count-input"
        />
      </div>

      {filteredData.slice(currentIndex, currentIndex + questionsToShow).map((question) => (
        <div key={question.id} className="quiz-question">
          <h3 className="question-text">{question.question}</h3>
          {question.hint && (
            <p className="hint-text">
              <strong>Hint (Bible Verse):</strong> {question.hint}
            </p>
          )}
          <ul className="options-list">
            {question.options.map((option, i) => (
              <li key={i} className="option-item">
                <label>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    checked={userAnswers[question.id] === option}
                    onChange={() => handleOptionChange(question.id, option)}
                    disabled={submitted}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
          {submitted && (
            <p className="correct-answer">
              <strong>Correct Answer:</strong> {question.answer}
            </p>
          )}
        </div>
      ))}

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
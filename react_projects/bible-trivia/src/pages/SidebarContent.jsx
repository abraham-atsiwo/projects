import React, { useState } from "react";

import SelectBook from "../components/SelectBook";
import SelectChapter from "../components/SelectChapter";
import NumberInput from "../components/NumberInput";
import DifficultyLevel from "../components/DifficultyLevel";
import FlashCard from "../components/FlashCard";
import FlashCardList from "../components/FlashCardList";
import QuizList from "../components/QuizList";

import books from "../books/books";

import "./sidebarContent.css";

function SidebarContent() {
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [difficultyLevel, setDifficultyLevel] = useState(""); // State for Difficulty Level
  // const [questionError, setQuestionError] = useState(""); // State to hold validation error
  const [filteredQuestions, setFilteredQuestions] = useState([]); // Store filtered quiz data
  const [quizStarted, setQuizStarted] = useState(false);
  const [displayFlashcard, setDisplayFlashcard] = useState(false);
  const [displayQuiz, setDisplayQuiz] = useState(false);

  // Handle book selection
  const handleBookChange = (bookName) => {
    const selected = books.find((book) => book.name === bookName);
    setSelectedBook(selected);
    setSelectedChapter("");
    setNumberOfQuestions(10);
    setDifficultyLevel("");
    // setQuestionError("");
    setQuizStarted(false);
  };

  // Handle chapter selection
  const handleChapterChange = (chapterName) => {
    setSelectedChapter(chapterName);
    setNumberOfQuestions(10);
    setDifficultyLevel("");
    // setQuestionError("");
    setQuizStarted(false);
  };

  // Handle number of questions input
  const handleNumberOfQuestionsChange = (value) => {
    const numQuestions = parseInt(value, 10);
    const maxQuestions = selectedBook?.content.length;

    if (isNaN(numQuestions) || numQuestions <= 0) {
      // setQuestionError("Please enter a valid number greater than 0.");
    } else if (numQuestions > maxQuestions) {
      // setQuestionError(
      //   `You cannot select more than ${maxQuestions} questions.`
      // );
    } else {
      // setQuestionError("");
    }

    setNumberOfQuestions(value);
  };

  // Handle difficulty level selection
  const handleDifficultyChange = (level) => {
    setDifficultyLevel(level);
    setQuizStarted(false); // Reset quiz state
  };

  const shuffle = (array) => array.sort(() => Math.random() - 0.5);

  // filter data
  const getFilteredData = () => {
    // Find the selected chapter's content based on the chapter name
    const selectedBookChapter = selectedBook.content.find(
      (chapter) => chapter.name === selectedChapter
    );

    // Filter the questions in the selected chapter by difficulty level
    let filtered;
    if (difficultyLevel.toLowerCase() === "all") {
      filtered = selectedBookChapter.content; // Use all questions
    } else {
      filtered = selectedBookChapter.content.filter(
        (quiz) => quiz.level === difficultyLevel.toLowerCase()
      );
    }

    filtered = shuffle(filtered);
    filtered = filtered.map((q) => ({
      ...q,
      options: shuffle(q.options),
    }));

    setFilteredQuestions(filtered.slice(0, numberOfQuestions)); // Limit results based on numberOfQuestions
    setQuizStarted(true);
  };

  // Handle Start Quiz click and filter quiz data
  const handleStartQuiz = () => {
    getFilteredData();

    setDisplayFlashcard(false);
    setDisplayQuiz(true);
    // console.log(filteredQuestions)
  };

  // Handle Flashcard
  const handleStartFlashCard = () => {
    getFilteredData();
    setDisplayFlashcard(true);
    setDisplayQuiz(false);
  };

  // Define isStartButtonDisabled based on conditions
  const isStartButtonDisabled =
    !selectedBook || !selectedChapter || !numberOfQuestions || !difficultyLevel;

  return (
    <div className="sidebar-content-container">
      <div className="sidebar">
        <SelectBook
          books={books}
          selectedBook={selectedBook ? selectedBook.name : ""}
          onBookChange={handleBookChange}
        />

        {/* Show ChapterDropdown only if a book is selected */}
        {selectedBook && (
          <SelectChapter
            chapters={selectedBook.content}
            selectedChapter={selectedChapter}
            onChapterChange={handleChapterChange}
          />
        )}

        {selectedBook && selectedChapter && (
          <NumberInput
            numberOfQuestions={numberOfQuestions}
            onNumberChange={handleNumberOfQuestionsChange}
            questions={filteredQuestions}
          />
        )}

        {/* Conditionally render the DifficultyLevelDropdown if both Book and Chapter are selected */}
        {selectedBook && selectedChapter && numberOfQuestions && (
          <DifficultyLevel
            difficultyLevel={difficultyLevel}
            onDifficultyChange={handleDifficultyChange}
          />
        )}

        <FlashCard
          name="Practice Flashcard"
          isDisabled={isStartButtonDisabled}
          onStartQuiz={handleStartFlashCard}
          color={displayFlashcard ? "#4CAF50" : "red"}
        />
        <FlashCard
          name="Take Quiz"
          isDisabled={isStartButtonDisabled}
          onStartQuiz={handleStartQuiz}
          color={displayQuiz ? "#4CAF50" : "red"}
        />
      </div>

      {/* content    */}
      <div className="content">
        {/* FlashCard: Pass the filtered questions to FlashCardList */}
        {filteredQuestions.length > 0 && quizStarted && displayFlashcard && (
          <FlashCardList questions={filteredQuestions} />
        )}

        {/* Quiz section  */}
        {filteredQuestions.length > 0 && quizStarted && displayQuiz && (
          <QuizList filteredData={filteredQuestions} />
        )}
      </div>
    </div>
  );
}

export default SidebarContent;

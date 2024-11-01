import React, { useRef, useState } from 'react';
import './QuizApp.css';

const QuizApp = () => {

  const questions = [{
    question: "Which of the following is Not a valid HTTP method?",
    answers: [
      { text: "GET", correct: false },
      { text: "POST", correct: false },
      { text: "FETCH", correct: true },
      { text: "DELETE", correct: false }
    ]
  },

  {
    question: "In python, which is the correct way to define a function?",
    answers: [
      { text: "function myFunction()", correct: false },
      { text: "def myFunction()", correct: true },
      { text: "fun myFunction()", correct: false },
      { text: "func myFunction()", correct: false }
    ]
  },

  {
    question: "In SQL, which keyword is used to remove duplicate rows from a query result?",
    answers: [
      { text: "REMOVE", correct: false },
      { text: "DISTINCT", correct: true },
      { text: "DELETE", correct: false },
      { text: "DROP", correct: false }
    ]
  }];

  const questionElement = useRef();
  

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState(null);

  const selectAnswer = (answer) => {
    setSelectedAnswers(answer);
    if (answer.correct) {
      setScore(score + 1);
    }
  };

  /*
    const buttons = document.querySelectorAll('.answer-btn button');
    buttons.forEach(button => {
      button.disabled = true;
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      } else {
        button.classList.add("incorrect");
      }
    }); */
    

  const nextQuestion = () => {
    setSelectedAnswers(null);
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowScore(false);
  }

  return (
    <>
      <div className="container">
        <h1>Quiz App</h1>
        {showScore ? (
          <div>
            <h2>You scored {score} out of {questions.length}!</h2>
            <button onClick={resetQuiz} className='next-btn'>Play Again</button>
          </div>
        ) : (
          <div>
            <h2 id="questions" ref={questionElement}>{questions[currentQuestionIndex].question}</h2>
            <div className="answer-btn">
            {questions[currentQuestionIndex].answers.map((answer, index) => {
              const isSelected = selectedAnswers === answer;
              const isCorrect = answer.correct;
              const isWrong = isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  className={`btn ${isSelected ? (isCorrect ? 'correct' : 'incorrect') : ''} ${selectedAnswers && isCorrect ? 'correct' : ''}`}
                  onClick={() => selectAnswer(answer)}
                  disabled={selectedAnswers !== null} // Disable buttons after selecting an answer
                >
                  {answer.text}
                </button>
              );
            })}
          </div>
            <button className='next-btn' onClick={nextQuestion}>Next</button>
          </div>
        )}
      </div>
    </>
  );
}

export default QuizApp
import React, { useState, useEffect } from 'react';
import './Oracle.css';
import wizardImage from '../assets/wizard.png'; 


const Oracle = ({ answers, busyAnswers }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [showQuestionInput, setShowQuestionInput] = useState(true);
  const [questionCount, setQuestionCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);

  const getRandomAnswer = (answersArray) => {
    const randomIndex = Math.floor(Math.random() * answersArray.length);
    return answersArray[randomIndex];
  };

  const handleAskQuestion = () => {
    if (!question.trim()) return;

    setIsAsking(true);
    setShowQuestionInput(false);
    setShowSpeechBubble(false);
    setIsAnimating(true);

    // Анимация магии
    setTimeout(() => {
      let selectedAnswer;
      
      // Каждый 10-й вопрос - особый ответ (скрыто от пользователя)
      if ((questionCount + 1) % 10 === 0) {
        selectedAnswer = getRandomAnswer(busyAnswers);
      } else {
        selectedAnswer = getRandomAnswer(answers);
      }

      setAnswer(selectedAnswer);
      setIsAnimating(false);
      setQuestionCount(prev => prev + 1);
      setShowSpeechBubble(true);
    }, 3000);
  };

  const handleNewQuestion = () => {
    setQuestion('');
    setAnswer('');
    setIsAsking(false);
    setShowQuestionInput(true);
    setShowSpeechBubble(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && question.trim()) {
      handleAskQuestion();
    }
  };

  return (
    <div className="oracle-container">
      <div className="oracle-card">
        <div className="oracle-image-container">
          <div className="oracle-image">
            {isAnimating ? (
              <div className="magic-animation">
                <div className="nebula"></div>
                <div className="star star-1"></div>
                <div className="star star-2"></div>
                <div className="star star-3"></div>
                <div className="star star-4"></div>
                <div className="magic-sparkle sparkle-1"></div>
                <div className="magic-sparkle sparkle-2"></div>
                <div className="magic-sparkle sparkle-3"></div>
              </div>
            ) : (
              <img 
                src={wizardImage} 
                alt="Волшебник" 
                className="wizard-image"
              />
            )}
          </div>

          {/* Выноска с текстом */}
          {showSpeechBubble && (
            <div className="speech-bubble">
              {!answer ? (
                <div className="bubble-text">✶⋆.Задай свой вопрос ⋆✴︎˚｡⋆</div>
              ) : (
                <div className="bubble-text answer">{answer}</div>
              )}
            </div>
          )}
        </div>

        <div className="oracle-content">
          {!isAsking && !answer && showQuestionInput && (
            <div className="initial-state">
              <div className="question-input-container">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Введите ваш вопрос..."
                  className="question-input"
                  maxLength={100}
                />
                <button 
                  onClick={handleAskQuestion}
                  disabled={!question.trim()}
                  className="ask-button"
                >
                  Задать вопрос
                </button>
              </div>
            </div>
          )}

          {isAnimating && (
            <div className="thinking-state">
              <h3 className="thinking-text">Волшебник размышляет...</h3>
              <div className="loading-dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          )}

          {answer && !isAnimating && (
            <div className="answer-state">
              <button onClick={handleNewQuestion} className="new-question-button">
                Задать новый вопрос
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Oracle;
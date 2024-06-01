import { useState, useCallback } from 'react'
import QUESTIONS from '../questions';
import trophy_icon from '../assets/quiz-complete.png';
import Question from './Question';

export default function Quiz() {
  const [ userAnswers, setUserAnswers ] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const isComplete = activeQuestionIndex === QUESTIONS.length;
  
  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setUserAnswers(prevAnswers => [...prevAnswers, selectedAnswer]);
  }, []);

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])
  
  if (isComplete) {
    return <div id='summary'>
      <img src={trophy_icon} alt='Trophy icon'/>
      <h2>Quiz Complete</h2>
    </div>
  }
  

  return (
    <div id='quiz'>       
      <Question 
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer} 
        onSkipAnswer={handleSkipAnswer}/>
    </div>
  )
}
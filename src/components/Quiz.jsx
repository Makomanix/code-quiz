import { useState, useCallback } from 'react'
import QUESTIONS from '../questions';
import trophy_icon from '../assets/quiz-complete.png';
import Question from './Question';

export default function Quiz() {
  
  const [ answerState, setAnswerState ] = useState('');
  const [ userAnswers, setUserAnswers ] = useState([]);

  const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
  const isComplete = activeQuestionIndex === QUESTIONS.length;
  
  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setAnswerState('answered');
    setUserAnswers(prevAnswers => [...prevAnswers, selectedAnswer]);

    setTimeout(() => {
      if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
        setAnswerState('correct')
      } else {
        setAnswerState('wrong')
      }

      setTimeout(() => {
        setAnswerState('');
      }, 2000);
    }, 1000);
  }, [activeQuestionIndex]);

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
        questionText={QUESTIONS[activeQuestionIndex.text]} 
        answers={QUESTIONS[activeQuestionIndex].answers} 
        onSelectAnswer={handleSelectAnswer} 
        answerState={answerState} 
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        onSkipAnswer={handleSkipAnswer}/>
    </div>
  )
}
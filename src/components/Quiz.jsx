import { useState, useCallback } from 'react'
import QUESTIONS from '../questions';
import Question from './Question';
import Summary from './Summary';

export default function Quiz() {
  const [ userAnswers, setUserAnswers ] = useState([]);
  console.log(userAnswers);

  const activeQuestionIndex = userAnswers.length;
  const isComplete = activeQuestionIndex === QUESTIONS.length;
  
  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setUserAnswers(prevAnswers => [...prevAnswers, selectedAnswer]);
  }, []);

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])
  
  if (isComplete) {
    return <Summary userAnswers={userAnswers}/>
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
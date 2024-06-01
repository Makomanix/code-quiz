import { useState } from 'react'
import QUESTIONS from '../questions';
import trophy_icon from '../assets/quiz-complete.png';

export default function Quiz() {
  const [ userAnswers, setUserAnswers ] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const isComplete = activeQuestionIndex === QUESTIONS.length;
  
  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers(prevAnswers => [...prevAnswers, selectedAnswer])
  }
  
  if (isComplete) {
    return <div id='summary'>
      <img src={trophy_icon} alt='Trophy icon'/>
      <h2>Quiz Complete</h2>
    </div>
  }
  
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort((a, b) => Math.random() - 0.5);

  return (
    <div id='quiz'>       
      <div id='question'>
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id='answers'>
          {shuffledAnswers.map(answer => 
          <li key={answer} className='answer'>
            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
          </li>)}
        </ul>
      </div>
    </div>
  )
}
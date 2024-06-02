import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";
import { useState } from "react";
import QUESTIONS from "../questions";

export default function Question({ 
  index, 
  onSelectAnswer,  
  onSkipAnswer
}) {

  const [ userAnswer, setUserAnswer ] = useState({
    selectedAnswer: '',
    isCorrect: null
  });

  let timer = 10000;

  if (userAnswer.selectedAnswer) {
    timer = 1000;
  }

  if (userAnswer.isCorrect !== null) {
    timer = 2000;
  }

  function handleSelectAnswer(answer) {
    setUserAnswer({
      selectedAnswer: answer,
      isCorrect: null
    })

    setTimeout(() => {
      setUserAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer
      })

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000)
    }, 1000)
  }

  let answerState = '';

  if (userAnswer.selectedAnswer && userAnswer.isCorrect !== null) {
    answerState = userAnswer.isCorrect ? 'correct' : 'wrong';
  } else if (userAnswer.selectedAnswer) {
    answerState = 'answered'
  }

  return (
    <div id='question'>
      <QuestionTimer
        key={timer}
        timeout={timer} 
        onTimeout={userAnswer.selectedAnswer === '' ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers} 
        selectedAnswer={userAnswer.selectedAnswer} 
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
  </div>
  )
}
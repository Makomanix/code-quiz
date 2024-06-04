import trophy_icon from '../assets/quiz-complete.png';
import QUESTIONS from '../questions.js';

export default function Summary({userAnswers}) {
  const skippedAnswers = userAnswers.filter(answer => answer === null);
  const correctAnswers = userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0])

  const skippedAnswerPercent = Math.round((skippedAnswers.length / userAnswers.length) * 100);
  const correctAnswerPercent = Math.round((correctAnswers.length / userAnswers.length) * 100);
  const incorrectAnswerPercent = (100 - correctAnswerPercent - skippedAnswerPercent);

  return (
    <div id='summary'>
      <img src={trophy_icon} alt='Trophy icon'/>
      <h2>Quiz Complete</h2>
      <div id='summary-stats'>
        <p>
          <span className='number'>{skippedAnswerPercent}%</span>
          <span className='text'>Skipped</span>
        </p>
        <p>
          <span className='number'>{correctAnswerPercent}%</span>
          <span className='text'>Correct</span>
        </p>
        <p>
          <span className='number'>{incorrectAnswerPercent}%</span>
          <span className='text'>Incorrect</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = 'user-answer';

          if (answer === null) {
            cssClass += ' skipped';
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += ' correct';
          } else {
            cssClass += ' wrong';
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className='question'>{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  )
}
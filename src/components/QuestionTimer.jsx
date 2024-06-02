import { useState, useEffect } from 'react';

export default function QuestionTimer({ timeout, onTimeout, mode }) {
  const [ remainingTime, setRemainingTime ] = useState(timeout)

  useEffect(() => {
    console.log('setting timeout');
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      console.log("clearTimeout");
      clearTimeout(timer)
    };
  }, [timeout, onTimeout])
  

  useEffect(() => {
    console.log('setting interval')
    const interval = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 50)
    }, 50)

    return () => {
      console.log("clearInterval");
      clearInterval(interval)
    };
  }, [])

  return (
    <progress 
      id='question-time' 
      max={timeout} 
      value={remainingTime} 
      className={mode}
    />
)
}
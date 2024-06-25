import React, { useRef, useState } from 'react'
import ResultModal from './ResultModal'

const TimeChallenge = ({title, targetTime}) => {
    const timer = useRef()
    const dialog = useRef()
    
    const [timeRemaining, setTimeRemaining] = useState(targetTime*1000)

    let timerIsActive = timeRemaining > 0 && timeRemaining < targetTime*1000

    if(timeRemaining <= 0){
      clearInterval(timer.current)
      dialog.current.open()
    }

    function handleReset(){
      setTimeRemaining(targetTime*1000)
    }

    function handleStart(){
        timer.current = setInterval(()=>{
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10)
        }, 10)
    }
    function handleStop(){
        clearInterval(timer.current)
        dialog.current.open()
    }
  return (
    <>
    <ResultModal ref={dialog} reset={handleReset} remainingTime={timeRemaining} targetTime={targetTime}/>
    <div className='challenge'>
      <h2>{title}</h2>
      <p className='challenge-time'>
        {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
      <button onClick={timerIsActive ? handleStop : handleStart}>
        {timerIsActive ? 'Stop' : 'Start'} Challenge
      </button>
      <p className={timerIsActive ? 'active' : ''}>
        {timerIsActive ? 'Your time is running...' : 'Time inactive'}
      </p>
    </div>
    </>
  )
}

export default TimeChallenge

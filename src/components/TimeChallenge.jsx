import React, { useRef, useState } from 'react'
import ResultModal from './ResultModal'

const TimeChallenge = ({title, targetTime}) => {
    const timer = useRef()
    const dialog = useRef()
    const [timeStarted, setTimeStarted] = useState(false)
    const [timeExpired, setTimeExpired] = useState(false)

    function handleStart(){
        timer.current = setTimeout(()=>{
            setTimeExpired(true)
            dialog.current.open()
        }, targetTime*1000)
        setTimeStarted(true)
    }
    function handleStop(){
        clearTimeout(timer.current)
    }
  return (
    <>
    <ResultModal ref={dialog} result="lost" targetTime={targetTime}/>
    <div className='challenge'>
      <h2>{title}</h2>
      <p className='challenge-time'>
        {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
      <button onClick={timeStarted ? handleStop : handleStart}>
        {timeStarted ? 'Stop' : 'Start'} Challenge
      </button>
      <p className={timeStarted ? 'active' : ''}>
        {timeStarted ? 'Your time is running...' : 'Time inactive'}
      </p>
    </div>
    </>
  )
}

export default TimeChallenge

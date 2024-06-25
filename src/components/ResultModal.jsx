import React from 'react'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom'

const ResultModal = forwardRef(({ reset, targetTime, remainingTime}, ref) => {
    const dialog = useRef()
    useImperativeHandle(ref, ()=>{
        return {
            open() {
                dialog.current.showModal()
            }
        }
    })
    const userLost = remainingTime <= 0
    const formattedTime = (remainingTime / 1000).toFixed(2)
    const score = Math.round((1 - remainingTime / (targetTime* 1000))*100)

  return createPortal(
    <dialog ref={dialog} className='result-modal' onClose={reset}>
      {userLost && <h2>You Lost</h2>}
      {!userLost && <h2>Your Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>{formattedTime} seconds left.</strong>
      </p>
      <form method='dialog' onSubmit={reset}>
        <button>
            Close
        </button>
      </form>
    </dialog>,
    document.getElementById('modal')
  )
})

export default ResultModal

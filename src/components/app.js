import React, { useState, useEffect } from "react";
import CountDownTimer from './countdownTimer/CountDownTimer';


export const SaaSProduct = () => {  
  const [countDown, setCountDown] = useState(0);
  const [countDownLabel, setCountDownLabel] = useState(0);
  const [inProgress, setInProgress] = useState(false);
  useEffect(() => {
    console.log("Found new time = " + countDown)
  }, [countDown]);
  const updateCountDown = (number, label) => {
    const THREE_DAYS_IN_MS = number * 60 * 1000;
    const NOW_IN_MS = new Date().getTime();
    const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;
    setCountDown(dateTimeAfterThreeDays)
    setCountDownLabel(label)
    setInProgress(!inProgress)
    
  }
  const resetCountDown = () => {
    console.log("Resetting timer")
    setInProgress(false)
  }
  return (
        <div>
          <div hidden={inProgress}>
            <div>
              <h4>Work</h4>
              <button onClick={() => {
                updateCountDown(25, "Work")
              }}>
                25 minutes
              </button>
              <button onClick={() => {
                updateCountDown(10, "Work")
              }}>
                10 minutes
              </button>
              <button onClick={() => {
                updateCountDown(5, "Work")
              }}>
                5 minutes
              </button>
            </div>
            <div>
              <h4>Rest</h4>
              <button onClick={() => {
                updateCountDown(10, "Rest")
              }}>
                10 minutes
              </button>
              <button onClick={() => {
                updateCountDown(8, "Rest")
              }}>
                8 minutes
              </button>
              <button onClick={() => {
                updateCountDown(5, "Rest")
              }}>
                5 minutes
              </button>
            </div>
            
          </div>
          <div hidden={!inProgress}>
            <button onClick={() => {
              resetCountDown()
            }}>
              Start Again
            </button>
          </div>
          <div hidden={!inProgress}>
            <CountDownTimer targetDate={countDown} textLabel={countDownLabel}/>  
          </div>
        
        </div>
  );
};
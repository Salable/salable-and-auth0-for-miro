import React, { useState, useEffect } from "react";
import CountDownTimer from './countdownTimer/CountDownTimer';
import { useAuth0 } from "@auth0/auth0-react"; 


export const SaaSProduct = () => {  
  const [countDown, setCountDown] = useState(0);
  const [countDownLabel, setCountDownLabel] = useState(0);
  const [inProgress, setInProgress] = useState(false);
  const { isLoading, isAuthenticated, getAccessTokenSilently} = useAuth0();
  useEffect(() => {
    console.log("Found new time = " + countDown)
    if (countDown === 0) {
      (async () => {
        if (isAuthenticated && !isLoading) { 
          const access_token = await getAccessTokenSilently();
          if (access_token) {
            try {         
              const response = await fetch("/.netlify/functions/get-timers", {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${access_token}`, 
                  contentType: "application/json"
                },
              });
              let responseJSON = await response.json()  
              if (responseJSON.data[0].data.event_params.inProgress === true) {
                if (responseJSON.data[0].data.event_params.timerEnd >= new Date()) {
                  setCountDown(responseJSON.data[0].data.event_params.timerEnd)          
                  setCountDownLabel(responseJSON.data[0].data.event_params.label)
                  setInProgress(responseJSON.data[0].data.event_params.inProgress) 
                } else {
                  console.log("Timer no longer active")
                }            
              }                                
            } catch (e) {
              console.log(e);   
            }
          }
        }
      
      })();  
    }
  }, [countDown, getAccessTokenSilently, isLoading, isAuthenticated]);
  const updateCountDown = (number, label) => {
    const THREE_DAYS_IN_MS = number * 60 * 1000;
    const NOW_IN_MS = new Date().getTime();
    const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;    
    (async () => {
      if (isLoading) {
        return <></>;
      }
      if (isAuthenticated && !isLoading) { 
        const access_token = await getAccessTokenSilently();
      if (access_token) {
        console.log(`Access Token: ${access_token}`)
        try {         
          const response = await fetch("/.netlify/functions/timers", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${access_token}`, 
              contentType: "application/json"
            },
            body: JSON.stringify({
              timerEnd: dateTimeAfterThreeDays,
              label : label,
              inProgress: true

            }),
          });
          console.log("Got a response")
          console.log(await response.json())
        } catch (e) {
          console.log(e);          
        }
      }
      }
      
    })();
    setCountDown(dateTimeAfterThreeDays)
    setCountDownLabel(label)
    setInProgress(!inProgress)
    
  }
  const resetCountDown = () => {
    (async () => {
      const access_token = await getAccessTokenSilently();
      if (access_token) {
        console.log(`Attempting to access with: ${access_token}`)
        try {         
          const response = await fetch("/.netlify/functions/stop-timers", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${access_token}`, 
              contentType: "application/json"
            },
            body: JSON.stringify({}),
          });
          console.log("Got a response")
          console.log(await response.json())
        } catch (e) {
          console.log(e);          
        }
      } 
    })();
    setInProgress(false)
  }
  const renderCountdown = () => {
    if (countDown !==0) return <CountDownTimer targetDate={countDown} textLabel={countDownLabel} />
    else return <></>
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
            {renderCountdown() }
          </div>
        
        </div>
  );
};
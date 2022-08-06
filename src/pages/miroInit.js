import React, {useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react"; 

const MiroInit = () => {    
  const { getAccessTokenSilently } = useAuth0();
  function useOnceCall(cb, condition = true) {
    const isCalledRef = React.useRef(false);
  
    React.useEffect(() => {
      if (condition && !isCalledRef.current) {
        isCalledRef.current = true;
        cb();
      }
    }, [cb, condition]);
  }
  useEffect(() => {
    (async () => {
      // try {         
      //   const userInfo = await window.miro.board.getUserInfo()
      //   const boardInfo = await window.miro.board.getInfo()
      //   const access_token = await getAccessTokenSilently();
      //   const response = await fetch("/.netlify/functions/analytics", {
      //     method: "POST",
      //     headers: {
      //       Authorization: `Bearer ${access_token}`, 
      //       contentType: "application/json"
      //     },
      //     body: JSON.stringify({
      //       source: window.location,
      //       userInfo: userInfo, 
      //       boardInfo: boardInfo
      //     }),
      //   });
      //   let responseJSON = await response.json()
      //   console.log(responseJSON)
      // } catch (e) {
      //   console.error(e);
      // }
    })();
  }, [getAccessTokenSilently]);
  useOnceCall(async () => {
    // writeUserDataToSegment()
  
   await window.miro.board.ui.on('icon:click', async () => {
      await window.miro.board.ui.openModal({
        url: '/miro-app',
        width: 800,
        height: 600,
        fullscreen: false,
      });
    });
  })
  return (
    <>
    </>
  );
};

export default MiroInit;

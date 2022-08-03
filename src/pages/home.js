import React from "react";
import { useAuth0 } from "@auth0/auth0-react"; 

const Home = () => {  
  // function useOnceCall(cb, condition = true) {
  //   const isCalledRef = React.useRef(false);
  
  //   React.useEffect(() => {
  //     if (condition && !isCalledRef.current) {
  //       isCalledRef.current = true;
  //       cb();
  //     }
  //   }, [cb, condition]);
  // } 

  // Render the content for the home page
const RenderHomeContent = (segmentKey) => {
  // Return loading, authenticated states, provide button to start login
  const { isLoading, isAuthenticated, loginWithPopup} = useAuth0();
  if (isLoading) {
    return <></>;
  }
  if (isAuthenticated) {  
    return<>Authed!</>
  }
  
  return <>
    <div>
      To get started, log in with your Salable account.
    </div>
    <div>
      <button onClick={() => {
        loginWithPopup().then(token => {
          //logged in. you can get the user profile like this:
          var rand = Math.floor((Math.random()*1000000)+1);
          window.location = window.location + "?uuid="+rand;
        });
      }}>Sign in Salable</button>
    </div>   
    
  </>
};
  return (
    <>
      <h1>Salable with Miro auth</h1>      
      <div>
      {RenderHomeContent()}
      </div>
    </>
  );
};

export default Home;
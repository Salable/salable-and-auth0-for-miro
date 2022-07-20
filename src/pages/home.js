import React, {useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react"; 

// Render the content for the home page
const RenderHomeContent = () => {
  // Return loading, authenticated states, provide button to start login
  const { isLoading, isAuthenticated, loginWithPopup} = useAuth0();

  if (isLoading) return <></>;

  if (isAuthenticated) {    
    return <>
      <div>You're logged in!</div>
    </>
  }
  
  return <>
    <div>
      To get started, log in with your Salable account.
    </div>
    <div>
      <button onClick={loginWithPopup}>Sign in Salable</button>
    </div>   
    
  </>
};

const Home = () => {  

  useEffect(() => {
    console.log(`Thank you for using ${process.env.REACT_APP_MIRO_APP_NAME}`)
  }, []);

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

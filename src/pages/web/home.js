import React, {useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react"; 
import {BuyNow} from "../../components/buyNow"
import { SaaSProduct } from "../../components/app";


const Home = (props) => {  
  const { loginWithPopup, getAccessTokenSilently } = useAuth0();
  useEffect(() => {    
    (async () => {
      if (props.isAuthenticated && !props.isLoading) { 
        const access_token = await getAccessTokenSilently();
        if (access_token) {
          try {         
            await fetch("/.netlify/functions/tenant", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${access_token}`, 
                contentType: "application/json"
              },
            });
          } catch (e) {
            console.log(e);          
          }
        }
      }
    })();
  }, [getAccessTokenSilently, props.isAuthenticated, props.isLoading]);
  const generateTimers = () => {
    return <>
      <SaaSProduct/>
    </>
  }
const RenderHomeContent = () => {
  if (props.isLoading) {
    return <></>;
  }  
  else if (!props.isLoading && props.isAuthenticated) {  
    
    console.log(props.capabilities)            
    
    if (props.capabilities === null) return <></>
    else if (props.capabilities.length > 0) {
      return <div>
        <h3>Start your Pomato Timer</h3>
        {generateTimers()}
      </div>
     
    }
    else return <>
    <h2>Pomato to the Rescue!</h2>
    <div>
      Pommodoro timers are really useful! They can help you stay focused and keep you on task. With Pomato you can keep focused when you're online, and even when you're using your favorite products like Trello and Miro! Get started using Pomoto today, and check out the offers below.
    </div>
    <BuyNow/>
    </>
    
  }
  return <>
    <div>
      <h1>Pomato - Your Pommodoro Timer </h1>
      <p>Use this product to generate ideas!</p>
      <hr></hr>
      <h3>Get started</h3> 
      <p>Login now to get started</p>     
      <button className="menuitem" onClick={() => {
                  loginWithPopup().then(token => {
                    console.log("login successful!")
                  });
                }}>Login</button>
    </div>

  </>
};
  return (
    <>   
      <div>
      {RenderHomeContent()}
      </div>
      <hr/>
      <div className="info">
      {props.email ? props.email : "Anonymous"} has the right to use the following capabilities: {props.capabilities}
      </div>
    </>
  );
};

export default Home;
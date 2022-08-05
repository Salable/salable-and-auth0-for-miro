import React from "react";
import { useAuth0 } from "@auth0/auth0-react"; 
import {BuyNow} from "../components/buyNow"
import { SaaSProduct } from "./app";


const Home = (props) => {  
  const { loginWithPopup } = useAuth0();


const RenderHomeContent = () => {
  if (props.isLoading) {
    return <></>;
  }  
  else if (!props.isLoading && props.isAuthenticated) {  
    console.log(props.capabilities)        
    if (props.capabilities === null) return <></>
    else if (props.capabilities.length > 0) {
      return <div>
        <h3>Your Inspirational Content</h3>
        <SaaSProduct/>
      </div>
     
    }
    else return <BuyNow/>
    
  }
  return <>
    <div>
      <h1>Welcome to Idea Generator!</h1>
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
      <div>
      {props.email} has the right to use the following capabilities: {props.capabilities}
      </div>

    </>
  );
};

export default Home;
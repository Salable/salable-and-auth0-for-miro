import React from "react";
import { useAuth0 } from "@auth0/auth0-react"; 
import {BuyNow} from "../../components/buyNow"
import { SaaSProduct } from "../../components/app";
import "./Miro.css"


const MiroApp = (props) => {  
  const { loginWithPopup } = useAuth0();


const RenderHomeContent = () => {
  console.dir(props.capabilities)
  if (props.isLoading) return <></>
  else if (props.capabilities === null && props.email !== null && !props.isLoading) return <></>
  else if (props.capabilities === null && props.email == null && !props.isLoading) return <>
  <div className="cs1 ce12">
        <button className="button button-primary" type="button" onClick={() => {
                loginWithPopup().then(token => {
                  console.log("login successful!")
                });
              }}>Log in with Pomato</button>
      </div></>
  else if (!props.isLoading && props.isAuthenticated && props.capabilities !== null) {          
    
    if (props.capabilities.includes("idea-generator-miro")) {
      return<>    
        <SaaSProduct />
     </>
    }
    else return <><BuyNow/></>;
    
  } else {
    return <>
    <div>
      <h1>Welcome to Idea Generator!</h1>
      <p>Use this product to generate ideas!</p>
      <hr></hr>
      <h3>Get started</h3> 
      <p>Login now to get started</p>     
      <div className="cs1 ce12">
        <button className="button button-primary" type="button" onClick={() => {
                loginWithPopup().then(token => {
                  console.log("login successful!")
                });
              }}>Log in with Pomato</button>
      </div>
    </div>

  </>
  }
  
};
  return (
    <>    
      <div className="grid">
      {RenderHomeContent()}
      </div>
      <hr />
      <div>
      {props.email ? props.email : "Anonymous"} has the right to use the following capabilities: {props.capabilities}
      </div>

    </>
  );
};

export default MiroApp;
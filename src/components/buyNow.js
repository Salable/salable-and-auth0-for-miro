import React from "react";
import { useAuth0 } from "@auth0/auth0-react"; 


export const BuyNow = () => { 
  const {user} = useAuth0(); 
  function useOnceCall(cb, condition = true) {
    const isCalledRef = React.useRef(false);
  
    React.useEffect(() => {
      if (condition && !isCalledRef.current) {
        isCalledRef.current = true;
        cb();
      }
    }, [cb, condition]);
}
    useOnceCall(async () => {
      CallSalablePricingTable()  
    })
    const CallSalablePricingTable = async () => {
        const email = user.email
        const Salable = window.Salable
        document.querySelector('.salable-pricing-table-container')?.remove();
        const tableNode = document.querySelector('#pricing-table')
        if (process.env.REACT_APP_SALABLE_API_KEY && tableNode) {
          const salable = new Salable(
            {
              pricingTableNode: tableNode,
              productUuid: process.env.REACT_APP_SALABLE_PRODUCT_UUID,
              apiKey: process.env.REACT_APP_SALABLE_API_KEY,
              globalPlanOptions: {
                granteeId: email,
                successUrl: process.env.REACT_APP_AUTH0_AUDIENCE,
                cancelUrl: process.env.REACT_APP_AUTH0_AUDIENCE,
                contactUsLink: process.env.REACT_APP_AUTH0_AUDIENCE
              }
            },
            {
              member: email,
              customer: {
                email: email
              }
            }
          );
          await salable.init();
          return <></>
        }        
        return <></>
    }     
  return (
    <>  
      <div>
        <h1>Choose your plan</h1>
      </div>
      <div id="pricing-table">
      </div>            
    </>
  );
};
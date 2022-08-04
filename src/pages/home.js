import React from "react";
import { useAuth0 } from "@auth0/auth0-react"; 
import getLicence, {getLicensesForPurchaser} from "../lib/salable/license";


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

  const licenseCheckFunction = async (email) => {
    let hasLicenses = await getLicence(email)
    if (hasLicenses) {
      let result = await getLicensesForPurchaser(email)
      callSalablePricingTable()
      console.dir(result)
    }    
  }

  // useOnceCall(async () => {
    
  // })

  const callSalablePricingTable = async () => {
    const Salable = window.Salable
    console.dir(Salable)
    const salable = new Salable(
      {
        pricingTableNode: document.querySelector('#pricing-table'),
        productUuid: '5108c23c-efe4-40f7-9043-0caed0b3cbd4',
        apiKey: 'qInsLxVYeT6GOPaNq2qAR4rFW1ZrBuVS9uHJIjUH',
        globalPlanOptions: {
          granteeId: 'example-grantee-id-123',
          successUrl: 'https://example.com/success',
          cancelUrl: 'https://example.com/cancel',
          contactUsLink: 'https://example.com/contact'
        }
      },
      {
        member: 'example-member-123',
        customer: {
          email: "person@company.com"
        }
      }
    );
    await salable.init();
  }
  // Render the content for the home page
const RenderHomeContent = (segmentKey) => {
  // Return loading, authenticated states, provide button to start login
  const { isLoading, isAuthenticated, loginWithPopup, user} = useAuth0();
  if (isLoading) {
    return <></>;
  }
  if (isAuthenticated) {          
    console.dir(user)
    licenseCheckFunction(user.email)    
    return<>
    {user.email}
    </>
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
      <div id="pricing-table">
      </div>
    </>
  );
};

export default Home;
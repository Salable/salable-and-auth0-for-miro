import React, {useState, useEffect} from "react";
import { getLicensesForPurchaser } from "../../lib/salable/license";


const Profile = (props) => {  
  const [licenses, setLicenses] = useState([]);
  useEffect(() => {    
    if (props.email) {
        getLicensesForPurchaser(props.email).then((result) => {
            if (result) setLicenses(result)
      })
    }
  }, [props.email]);

const RenderHomeContent = () => {
  if (props.isLoading) {
    return <></>;
  }

  if (!props.isLoading && props.isAuthenticated) {          
    return <>
    <div>
      <h1>Profile</h1>
      <p>Email: {props.email}</p>
      <hr></hr>
    </div>
  </>
    
  }
  
};
const RenderLicenses = () => {
    if (licenses !== undefined && licenses.length > 0 ) return <>
    <div>
    {licenses.map((item) => ( 
      <div key={item.uuid}>       
        <p key={item.uuid + "-uuid"}>{item.uuid}</p>
        <p key={item.uuid + "-status"}>{item.status}</p>
        </div>
      ))}
      </div>
    </>
}
  return (
    <>    
      <div>
      {RenderHomeContent()}
      <h3>Licenses</h3> 
      {RenderLicenses()}
      </div>
      <div className="info">
      {props.email} has the right to use the following capabilities: {props.capabilities}
      </div>

    </>
  );
};

export default Profile;
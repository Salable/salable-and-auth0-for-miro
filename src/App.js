import React, {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import MiroInit from "./pages/miroInit"
import Layout from "./components/layout";
import getLicence from "./lib/salable/license";
import { useAuth0 } from "@auth0/auth0-react"; 
import "./App.css";
import MiroApp from "./pages/miroApp";
import Profile from "./pages/profile";

const storeLicenseDetails = async (email) => {
  const license = await getLicence(email)
  return license
}
const App = () => {
  const { user, isLoading, isAuthenticated } = useAuth0();
  const [email, setEmail] = useState(null);
  const [capabilities, setCapabilities] = useState(null);
  useEffect(() => {
    if (user) {
      storeLicenseDetails(user.email).then((result) => {
        if (result && result.capabilities !== null) setCapabilities(result.capabilities)
        else setCapabilities([])
      })
      setEmail(user.email)
    }
  }, [user]);


  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home email={email} capabilities={capabilities} isLoading={isLoading} isAuthenticated={isAuthenticated}/>} />
          <Route path="/miro-init" element={<MiroInit />} />
          <Route path="/miro-app" element={<MiroApp email={email} capabilities={capabilities} isLoading={isLoading} isAuthenticated={isAuthenticated}/>} />
          <Route path="/profile" element={<Profile email={email} capabilities={capabilities} isLoading={isLoading} isAuthenticated={isAuthenticated}/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;

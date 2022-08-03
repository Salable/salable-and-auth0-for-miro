import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import MiroInit from "./pages/miroInit"
import Layout from "./components/layout";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/miro-init" element={<MiroInit />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;

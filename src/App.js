import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";


import HomePage from "./Components/HomePage";

function App() {
  return (
  
    <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<HomePage/>} />
        </Routes>
    
    </Router>
  );
}

export default App;

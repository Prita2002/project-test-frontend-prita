import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import Main from "./components/Main";

const App = () => {
  return (
    <Router>
      <div>
        <AppNavbar />
        <Routes>
          <Route path="/ideas" element={<Main />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

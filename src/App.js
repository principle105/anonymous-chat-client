import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import "./styles/main.css";

import Join from "./pages/Join";

const App = () => {
  return (
    <Router>
      <Route path="/" component={Join} />
    </Router>
  )
}

export default App;

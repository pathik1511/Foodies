import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from './routes';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes></Routes>
      </Router>
    </>

  );
}

export default App;

import './App.css';
import React from "react";
import HomePage from './components/HomePage'

import { TripProvider } from "./store";

function App() {
  return (
    <div className="App">
      <HomePage>

      </HomePage>
    </div>
  );
}

export default App;

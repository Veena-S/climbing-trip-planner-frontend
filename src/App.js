import './App.css';
import React from "react";
import HomePage from './components/HomePage'
import NavbarComponent from './components/NavbarComponent.jsx'

import { TripProvider } from "./store";

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <HomePage>

      </HomePage>
    </div>
  );
}

export default App;

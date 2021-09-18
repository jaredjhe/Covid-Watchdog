import FullRegions from "./components/FullRegions";
import React, { Component } from "react";

import TestMap from "./components/MapTest";
import Popup from "./components/Popup";

import "./styles/App.scss";
import "./styles/CovidStats.scss";
import "./styles/FullRegions.scss";


function App() {
  return (
    <div>
      <TestMap />
      <Popup />
    </div>
  );
}

export default App;

import React, { Component, useRef, useState } from 'react';
import FullRegions from "./components/FullRegions";
import TestMap from "./components/MapTest";


import "./styles/App.scss";
import "./styles/CovidStats.scss";
import "./styles/FullRegions.scss";

function App() {
  const [province, setProvince] = useState("")
  const callScrollApp = (nameOfProvince) => {
    setProvince(nameOfProvince);
  }
  return (
    <div>
      <TestMap callScrollApp={callScrollApp} />
      {province !== "" && <FullRegions provinceCode={province} />}
    </div>
  );
}

export default App;

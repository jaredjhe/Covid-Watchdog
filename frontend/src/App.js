import FullRegions from './components/FullRegions';
import React, { Component, useRef, useState } from 'react';

import TestMap from './components/MapTest';

import './styles/App.scss';
import './styles/CovidStats.scss'
import './styles/FullRegions.scss'
import CovidStats from './components/CovidStats';

function App() {
  const [province, setProvince] = useState("")
  const callScrollApp = (nameOfProvince) => {
    setProvince(nameOfProvince);
  }
  return (
    <div>
      <TestMap callScrollApp={callScrollApp} />
      {province !== "" && <FullRegions />}
    </div>
  );
}

export default App;

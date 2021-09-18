import FullRegions from './components/FullRegions';
import React, { Component } from 'react';

import TestMap from './components/MapTest';

import './styles/App.scss';
import './styles/CovidStats.scss'
import './styles/FullRegions.scss'

function App() {
  return (
    <div>
      <TestMap />
      <FullRegions />
    </div>
  );
}

export default App;

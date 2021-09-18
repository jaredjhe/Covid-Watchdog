import FullRegions from './components/FullRegions';
import React from 'react';

import TestMap from './components/MapTest';

import './styles/App.scss';
import './styles/CovidStats.scss'
import './styles/FullRegions.scss'
import CovidStats from './components/CovidStats';

function App() {
  return (
    <div>
      <TestMap />
      <FullRegions />
    </div>
  );
}

export default App;

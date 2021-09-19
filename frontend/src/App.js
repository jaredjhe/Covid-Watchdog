import React, { Component, useRef, useState } from "react";
import FullRegions from "./components/FullRegions";
import TestMap from "./components/MapTest";
import Popup from "./components/Popup";
import RegionData, { RegionDataProvider } from "./region-data";

import "./styles/App.scss";
import "./styles/CovidStats.scss";
import "./styles/FullRegions.scss";


function App() {
  const [province, setProvince] = useState("ON");
  const callScrollApp = (nameOfProvince) => {
    setProvince(nameOfProvince);
  };
  return (
    <RegionDataProvider>
    <div>
      <TestMap callScrollApp={callScrollApp}  setProvince={setProvince}/>
      {province !== "" && <FullRegions provinceCode={province} r/>}
    </div>
    </RegionDataProvider>
  );
}

export default App;

import React, { useState } from "react";
import FullRegions from "./components/FullRegions";
import TestMap from "./components/MapTest";
import { RegionDataProvider } from "./region-data";

import "./styles/App.scss";
import "./styles/CovidStats.scss";
import "./styles/FullRegions.scss";


function App() {
  async function connectBackend() {
    const provinceCodes = ['ON', 'QC', 'BC', 'MB', 'NT', 'NS', 'NU', 'PE', 'SK', 'YT', 'NB', 'AB', 'NL'];
    const provinceDataJson = await Promise.all(provinceCodes.map((code) => fetch(`/api/v1/CanadaCovidInfo/${code}/provinceInfo`)));
    console.log(provinceDataJson);
    const first = await provinceDataJson[0].json();
    console.log(first)
    // const provinceData = await Promise.all(provinceDataJson.map((header) => header.json()));
    // console.log(provinceData)
  }
  
  connectBackend()

  const [province, setProvince] = useState("ON");
  const callScrollApp = (nameOfProvince) => {
    setProvince(nameOfProvince);
  };
  return (
    <RegionDataProvider>
    <main>
      <div className="landing">
        <div className="title">
          <h1>COVID Watchdog</h1>
          <h2>Keeps you safe while exploring The Great North</h2>
        </div>
        <TestMap callScrollApp={callScrollApp}  setProvince={setProvince}/>
      </div>
      
      {province !== "" && <FullRegions provinceCode={province} r/>}
    </main>
    </RegionDataProvider>
  );
}

export default App;

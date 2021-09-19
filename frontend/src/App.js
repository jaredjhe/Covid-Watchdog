import React, { useState } from "react";
import FullRegions from "./components/FullRegions";
import TestMap from "./components/MapTest";
import { RegionDataProvider } from "./region-data";

import "./styles/App.scss";
import "./styles/CovidStats.scss";
import "./styles/FullRegions.scss";


function App() {
  async function connectBackend() {
    try {
      const provinceCodes = ['ON', 'QC', 'BC', 'MB', 'NT', 'NS', 'NU', 'PE', 'SK', 'YT', 'NB', 'AB', 'NL'];
      const provinceDataJson = await Promise.all(provinceCodes.map((code) => fetch(`http://localhost:5000/api/v1/CanadaCovidInfo/${code}/provinceInfo`)));
      sessionStorage.setItem("provinceDataJson", JSON.stringify(provinceDataJson))
      const provinceData = await Promise.all(provinceDataJson.map((header) => header.json()));
      sessionStorage.setItem("provinceData", JSON.stringify(provinceData));

      let newProvinceData = provinceData.reduce(function (map, obj) {
        map[obj.prov] = obj;
        return map;
      }, {});

      const asyncSessionStorage = {
        setItem: function (key, value) {
          return Promise.resolve().then(function () {
            sessionStorage.setItem(key, value);
          }).catch(err => console.log(err));
        },
        getItem: function (key) {
          return Promise.resolve().then(function () {
            return sessionStorage.getItem(key);
          });
        }
      };

      let fetches = [];
      for (const province in newProvinceData) {
        fetches.push(fetch(`http://localhost:5000/api/v1/CanadaCovidInfo/${province}/allRegionsInfo`)
          .then(response => response.json())
          .then(data => {
            newProvinceData[province].regions = data;
            console.log(newProvinceData[province].regions);
          }))
      }

      console.log("Hello!");
    } catch (err) {
      console.log(err);
    }

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
            <p>Made with the four brain cells of {' '}
              <a href="https://github.com/dylex-suan">Dylex</a>,
              <a href="https://github.com/jaredjhe">{' '}Jared</a>,
              <a href="https://github.com/mhahelwa2020">{' '}Mohamed</a>,
              {' '}and{' '}
              <a href="https://github.com/albertjlay">Albert {' '}</a>
              :)
            </p>
          </div>
          <TestMap callScrollApp={callScrollApp} setProvince={setProvince} />
        </div>

        {province !== "" && <FullRegions provinceCode={province} r />}
      </main>
    </RegionDataProvider>
  );
}

export default App;

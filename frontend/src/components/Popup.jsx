import React, { useState, useEffect } from "react";
import TravelIcon from "../assets/travel.svg";
import CovidStats from "./CovidStats";
import "../styles/Popup.scss";
import provinceDesc from "./provinceDesc.json";

const Popup = (props) => {
  const [name, setName] = useState("");
  const [isSafe, setIsSafe] = useState(true);
  const [lowRiskRegions, setLowRiskRegions] = useState([]);
  const [highRiskRegions, setHighRiskRegions] = useState([]);

  useEffect(() => {
    const getSortedRegions = async (data, props) => {
      const regionData = await Promise.all(
        data.regions
          .filter((region) => region.hr_uid !== 9999)
          .map((region) => {
            return fetch(
              `/api/v1/CanadaCovidInfo/${props.province}/${region.hr_uid}/regionInfo`
            )
              .then((response) => {
                return response.json();
              })
              .then((regionData) => {
                return regionData;
              });
          })
      );
      return regionData.sort(
        (a, b) => a.active_cases_per_million - b.active_cases_per_million
      );
    };

    fetch(`/api/v1/CanadaCovidInfo/${props.province}/provinceInfo`)
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        setName(data.prov);
        setIsSafe(data.isSafe);
        const sortedRegions = await getSortedRegions(data, props);

        setLowRiskRegions(sortedRegions.slice(0, 2));
        setHighRiskRegions(
          sortedRegions.slice(sortedRegions.length - 2, sortedRegions.length)
        );
      });
  }, []);

  return (
    <div className="popup">
      <div
        className="is-safe-bar"
        style={{ backgroundColor: isSafe ? "#00BFA6" : "#F50057" }}
      >
        <div className="content">
          <div className="header">
            <div className="province">
              <h1>{name}</h1>
              <h2>{provinceDesc[name]}</h2>
            </div>
            <img src={TravelIcon} alt="Two people traveling" />
          </div>
          <CovidStats displayHeader={true} regionsData={lowRiskRegions} />
          <CovidStats displayHeader={false} regionsData={highRiskRegions} />
        </div>
      </div>
    </div>
  );
};

export default Popup;

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
  const [allRegions, setAllRegions] = useState([]);

  useEffect(() => {
    fetch(`/api/v1/CanadaCovidInfo/${props.province}/provinceInfo`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setName(data.prov);
        setIsSafe(data.isSafe);
        const sortedRegions = data.regions.sort(
          (a, b) => a.active_cases_per_million - b.active_cases_per_million
        );

        if (sortedRegions.length >= 6) {
          setLowRiskRegions(sortedRegions.slice(0, 2));
          setHighRiskRegions(
            sortedRegions.slice(sortedRegions.length - 2, sortedRegions.length)
          );
        } else {
          setAllRegions(sortedRegions);
        }
      });
  }, [props.province]);

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
          {allRegions.length === 0 ? (
            <div>
              <CovidStats displayHeader={true} regionsData={lowRiskRegions} />
              <CovidStats displayHeader={false} regionsData={highRiskRegions} />
            </div>
          ) : (
            <div>
              <CovidStats displayHeader={true} regionsData={allRegions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;

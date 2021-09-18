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
    // TODO: REMOVE TEMP STUFF ============================================
    setName(props.province);
    setIsSafe(false);
    setLowRiskRegions([
      {
        name: "Waterloo",
        id: 8484,
        active_cases_per_million: 3,
        fully_vaccinated_proportion: 0.6,
        vulnerable_proportion: 0.001,
        is_safe: true,
      },
    ]);
    setHighRiskRegions([
      {
        name: "Waterloo",
        id: 8484,
        active_cases_per_million: 3,
        fully_vaccinated_proportion: 0.6,
        vulnerable_proportion: 0.001,
        is_safe: true,
      },
    ]);

    // fetch(`/api/v1/CanadaCovidInfo/${props.province}/provinceInfo`)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setName(data.province_code);
    //     data.regions.map((region) => {
    //       fetch(`/api/v1/CanadaCovidInfo/${props.province}/${props.province.hr_uid}/regionInfo`)
    //         .then((response) => {
    //           return response.json();
    //         })
    //         .then((data) => {
    //           if (data.is_safe) {
    //             getRate(
    //               data.active_cases_per_million,
    //               data.fully_vaccinated_proportion,
    //               data.vulnerable_proportion
    //             );
    //           }
    //         });
    //     });
    //   });
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

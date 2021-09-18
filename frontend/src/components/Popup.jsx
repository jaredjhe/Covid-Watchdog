import React, { useState, useEffect } from "react";
import TravelIcon from "../assets/travel.svg";
import CovidStats from "./CovidStats";
import "../styles/Popup.scss";
import provinceDesc from "./provinceDesc.json";

const Popup = () => {
  const [name, setName] = useState("");
  const [isSafe, setIsSafe] = useState(true);
  const [lowRiskRegions, setLowRiskRegions] = useState([]);
  const [highRiskRegions, setHighRiskRegions] = useState([]);

  useEffect(() => {
    setName("ON");
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

    // provinceData = {
    //   province_code: "ON",
    //   active_cases_per_million: 500,
    //   fully_vaccinated_proportion: 0.89,
    //   vulnerable_proportion: 0.03,
    //   is_safe: true,
    //   regions: [
    //     {
    //       hr_uid: 3526,
    //       health_region: "Algoma",
    //       health_region_health_org: "The District of Algoma Health Unit",
    //       prov: "ON",
    //     },
    //     {
    //       hr_uid: 3527,
    //       health_region: "Brant",
    //       health_region_health_org: "Brant County Health Unit",
    //       prov: "ON",
    //     },
    //   ],
    // };

    // fetch("allregs")
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setName(data.province_code);
    //     data.regions.map((region) => {
    //       fetch("eachregion")
    //         .then((response) => {
    //           // "api/werjerhihwerh/${region.hr_uid"}
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
            <img src={TravelIcon} alt="Two people traveling." />
          </div>
          <CovidStats displayHeaders={true} regionsData={lowRiskRegions} />
          <CovidStats displayHeaders={false} regionsData={highRiskRegions} />
        </div>
      </div>
    </div>
  );
};

export default Popup;

import React, { useState } from "react";
import TravelIcon from "../assets/travel.svg";

const Popup = () => {
  const [name, setName] = useState("");
  const [lowRiskRegions, setLowRiskRegions] = useState([]);
  const [highRiskRegions, setHighRiskRegions] = useState([]);

  fetch("allregs")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setName(data.province_code);
      data.regions.map((region) => {
        fetch("eachregion")
          .then((response) => {
            // "api/werjerhihwerh/${region.hr_uid"}
            return response.json();
          })
          .then((data) => {
            if (data.is_safe) {
              getRate(
                data.active_cases_per_million,
                data.fully_vaccinated_proportion,
                data.vulnerable_proportion
              );
            }
          });
      });
    });

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

  return (
    <div>
      <div class="name">
        <h1>{name}</h1>
        <TravelIcon />
      </div>
      {lowRiskRegions}
      {highRiskRegions}
      {/* <Table displayHeaders="true" regionsData={lowRiskRegions} />
      <Table displayHeaders="false" regionsData={highRiskRegions} /> */}
    </div>
  );
};

export default Popup;

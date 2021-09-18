import { useState, useEffect } from 'react';
import travelIcon from '../assets/travel.svg'
import homeIcon from '../assets/relaxing-at-home.svg'
import CovidStats from './CovidStats';

function FullSafeRegions() {
  return (
    <section className="safe-regions">
      <div className="call-to-action">
        <img src={travelIcon} alt="Two person traveling." />
        <h2>Let's book that trip!</h2>
      </div>
      <CovidStats displayHeader regionsData={[
        {
          name: "Waterloo",
          id: 8484,
          'active_cases_per_million': 3,
          'fully_vaccinated_proportion': 0.6,
          'vulnerable_proportion': 0.001,
          'is_safe': true,
        }, {
          name: "Toronto",
          id: 8384,
          'active_cases_per_million': 3000,
          'fully_vaccinated_proportion': 0.8,
          'vulnerable_proportion': 0.3,
          'is_safe': false,
        }
      ]} />
    </section>
  )
}

function FullWarningRegions() {
  return (
    <section className="warning-regions">
      <div className="call-to-action">
        <h2>Maybe Netflix would be better?</h2>
        <img src={homeIcon} alt="A person chilling at home." />
      </div>
      <CovidStats displayHeader regionsData={[
        {
          name: "Waterloo",
          id: 8484,
          'active_cases_per_million': 3,
          'fully_vaccinated_proportion': 0.6,
          'vulnerable_proportion': 0.001,
          'is_safe': true,
        }, {
          name: "Toronto",
          id: 8384,
          'active_cases_per_million': 3000,
          'fully_vaccinated_proportion': 0.8,
          'vulnerable_proportion': 0.3,
          'is_safe': false,
        }
      ]} />
    </section>
  )
}

/**
 * Component which will show up after the user click on a province in the map.
 */
function FullRegions(props) {
  const { provinceCode } = props;
  const [regionData, setRegionData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const provinceDataJson = await fetch(`http://localhost:8000/api/v1/CanadaCovidInfo/${provinceCode}/provinceInfo`);
        const provinceData = await provinceDataJson.json();
        console.log(provinceData)
        const regionsDataArray = await Promise.all(provinceData.regions.map(async (el) => await fetch(`/api/v1/CanadaCovidInfo/${provinceCode}/${el.hr_uid}/regionInfo`).then(res => res.json())));
        // const regionsDataArray = await Promise.all(regionsDataJsonArray.map(async (el) => await el.json()))
        console.log(regionsDataArray);

        // const regionsDataArray = provinceData.regions.map(async (el) => {
        //   const curRegionDataJson = await fetch(`/api/v1/CanadaCovidInfo/${provinceCode}/${el.hr_uid}/regionInfo`);
        //   const curRegionData = await curRegionDataJson.json();
        //   console.log(curRegionData);
        //   return curRegionData;
          // return await fetch(`/api/v1/CanadaCovidInfo/${provinceCode}/${el.hr_uid}/regionInfo`);
        // })
        // console.log(regionsDataArray);
        setRegionData(regionsDataArray);
      }
      catch(error) {
        throw new Error(error)
      }
    }
    fetchData();

  }, [provinceCode])

  return (
    <section className="full-regions">
      <div className="safe-regions">
        <div className="call-to-action">
          <img src={travelIcon} alt="Two person traveling." />
          <h2>Let's book that trip!</h2>
        </div>
        <CovidStats displayHeader regionsData={regionData.filter(data => data.is_safe)} />
        {/* <CovidStats displayHeader regionsData={regionData} /> */}
      </div>
      <div className="warning-regions">
        <div className="call-to-action">
          <h2>Maybe Netflix would be better?</h2>
          <img src={homeIcon} alt="A person chilling at home." />
        </div>
        <CovidStats displayHeader regionsData={regionData.filter(data => !data.is_safe)} />
        {/* <CovidStats displayHeader regionsData={regionData} /> */}

      </div>
    </section>
  )
}
export default FullRegions;
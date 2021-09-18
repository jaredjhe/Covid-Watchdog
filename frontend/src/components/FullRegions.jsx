import { useState, useEffect } from 'react';
import travelIcon from '../assets/travel.svg'
import homeIcon from '../assets/relaxing-at-home.svg'
import CovidStats from './CovidStats';



/**
 * Component which will show up after the user click on a province in the map.
 */
function FullRegions(props) {
  const { provinceCode } = props; 
  const [regionData, setRegionData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/CanadaCovidInfo/${provinceCode}/provinceInfo`)
      .then(res => res.json())
      .then(
        (result) => {
          setRegionData(result);
        },
        (error) => {
          throw new Error(`Cannot reach server. Try again later! ${error}`)
        }
      )
  }, [provinceCode])

  return (
    <section className="full-regions">
      <div className="safe-regions">
        <div className="call-to-action">
          <img src={travelIcon} alt="Two person traveling."/>
          <h2>Let's book that trip!</h2>
        </div>
        <CovidStats displayHeader regionsData={regionData.filter(data => data.is_safe)}/>
      </div>
      <div className="warning-regions">
        <div className="call-to-action">
          <h2>Maybe Netflix would be better?</h2>
          <img src={homeIcon} alt="A person chilling at home."/>
        </div>
        <CovidStats displayHeader regionsData={regionData.filter(data => !data.is_safe)}/>
      </div>
    </section>
  )
}
export default FullRegions;
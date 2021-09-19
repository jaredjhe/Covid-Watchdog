import React, { useState } from 'react';
import TravelIcon from '../assets/travel.svg';
import CovidStats from './CovidStats';
import '../styles/Popup.scss';
import provinceDesc from './provinceDesc.json';
import RegionData from '../region-data';

const Popup = (props) => {
  const [name, setName] = useState('');
  const [isSafe, setIsSafe] = useState(true);

  return (
    <RegionData.Consumer>
      {(value) => {
        const provinceValue = value[props.province];

        {
          /* setName(provinceValue.prov);
        setIsSafe(provinceValue.is_safe); */
        }
        const sortedRegions = provinceValue.regions.sort(
          (a, b) => a.active_cases_per_million - b.active_cases_per_million
        );
        const lowRiskRegions = sortedRegions.slice(0, 2);
        const highRiskRegions = sortedRegions.slice(sortedRegions.length - 2, sortedRegions.length);

        return (
          <div className="popup">
            <div
              className="is-safe-bar"
              style={{ backgroundColor: isSafe ? '#00BFA6' : '#F50057' }}
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
      }}
    </RegionData.Consumer>
  );
};

export default Popup;

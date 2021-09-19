import travelIcon from '../assets/travel.svg';
import homeIcon from '../assets/relaxing-at-home.svg';
import CovidStats from './CovidStats';
import RegionData from '../region-data';

/**
 * Component which will show up after the user click on a province in the map.
 */
function FullRegions(props) {
  const { provinceCode } = props;

  return (
    <RegionData.Consumer>
      {(value) => {
        return (
          <section className="full-regions" id="full-regions">
            <div className="safe-regions">
              <div className="call-to-action">
                <img src={travelIcon} alt="Two person traveling." />
                <h2>Let's book that trip!</h2>
              </div>
              <CovidStats
                displayHeader
                regionsData={value[provinceCode].regions.filter((data) => data.isSafe)}
              />
              {/* <CovidStats displayHeader regionsData={regionData} /> */}
            </div>
            <div className="warning-regions">
              <div className="call-to-action">
                <h2>Maybe Netflix would be better?</h2>
                <img src={homeIcon} alt="A person chilling at home." />
              </div>
              <CovidStats
                displayHeader
                regionsData={value[provinceCode].regions.filter((data) => !data.isSafe)}
              />
              {/* <CovidStats displayHeader regionsData={regionData} /> */}
            </div>
          </section>
        );
      }}
    </RegionData.Consumer>
  );
}
export default FullRegions;

import travelIcon from '../assets/travel.svg'
import CovidStats from './CovidStats';

function FullSafeRegions() {
  return (
    <section className="full-regions safe-regions">
      <div className="call-to-action">
        <img src={travelIcon} alt="Two person traveling."/>
        <h2>Let's book that trip!</h2>
      </div>
      <CovidStats />
    </section>
  )
}

export default FullSafeRegions;
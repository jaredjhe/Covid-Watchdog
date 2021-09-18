import travelIcon from '../assets/travel.svg'
import homeIcon from '../assets/relaxing-at-home.svg'
import CovidStats from './CovidStats';

function FullSafeRegions() {
  return (
    <section className="safe-regions">
      <div className="call-to-action">
        <img src={travelIcon} alt="Two person traveling."/>
        <h2>Let's book that trip!</h2>
      </div>
      <CovidStats displayHeader />
    </section>
  )
}

function FullWarningRegions() {
  return (
    <section className="warning-regions">
      <div className="call-to-action">
        <h2>Maybe Netflix would be better?</h2>
        <img src={homeIcon} alt="A person chilling at home."/>
      </div>
      <CovidStats displayHeader />
    </section>
  )
}

function FullRegions() {
  return (
    <section className="full-regions">
      <FullSafeRegions />
      <FullWarningRegions />
    </section>
  )
}
export default FullRegions;
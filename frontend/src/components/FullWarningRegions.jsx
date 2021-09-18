import homeIcon from '../assets/relaxing-at-home.svg'
import CovidStats from './CovidStats';

function FullWarningRegions() {
  return (
    <section className="full-regions warning-regions">
      <div className="call-to-action">
        <img src={homeIcon} alt="Two person traveling."/>
        <h2>Let's book that trip!</h2>
      </div>
      <CovidStats />
    </section>
  )
}

export default FullWarningRegions;
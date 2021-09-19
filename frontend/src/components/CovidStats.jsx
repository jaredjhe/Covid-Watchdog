// /**
//  * Table which renders a COVID-19 row. Meant to be used inside CovidDataTable.
//  * Will only display data if supplied in this order: 
//  * activeCasesPerMillion, fullyVaccinatedPercentage, dailyDeaths.
//  */
// function CovidDataRow(props) {
//   const {covidData} = props;
//   return (
//     <tr>
//       {covidData.activeCasesPerMillion && <td>{covidData.activeCasesPerMillion}</td>}
//       {covidData.fullyVaccinatedPercentage && <td>{covidData.fullyVaccinatedPercentage}</td>}
//       {covidData.dailyDeaths && <td>{covidData.dailyDeaths}</td>}
//     </tr>
//   )
// }

// /**
//  * Table which shows the COVID-19 data. Use props to customize which data is displayed.
//  */
// function CovidDataTable(props) {
//   const {covidData, displayActiveCasesPerMillion, displayFullyVaccinatedPercentage, displayDailyDeaths} = props;
//   return (
//   <table>
//     <tbody>
//         {covidData.map(region => {
//           const regionCovidData = {
//             displayActiveCasesPerMillion && 
//           }
//         }<CovidDataRow activeCasesPerMillion={region.activeCasesPerMillion} fullyVaccinatedPercentage={region.fullyVaccinatedPercentage} dailyDeaths={region.dailyDeaths}/>)}
//     </tbody>
//   </table>)
// }

// function CovidDataRow(props) {
//   const {covidData} = props;
//   return (
//     <tr>
//       {covidData.activeCasesPerMillion && <td>{covidData.activeCasesPerMillion}</td>}
//       {covidData.fullyVaccinatedPercentage && <td>{covidData.fullyVaccinatedPercentage}</td>}
//       {covidData.dailyDeaths && <td>{covidData.dailyDeaths}</td>}
//     </tr>
//   )
// }

import { regionActiveCasesPerMillionStyle, regionFullyVaccinatedProportionStyle, regionVulnerableProportionStyle } from "../utils";



function CovidStats(props) {
  const { displayHeader, regionsData } = props;
  console.log(regionsData)

  return (
  <table className="covid-stats">
    {displayHeader &&
      <thead>
        <tr>
          <th>City</th>
          <th>Active Cases per Million</th>
          <th>Fully Vaxxed (%)</th>
          <th>Vulnerable Population(%)</th>
        </tr>
      </thead>
    }
    <tbody>
      {regionsData.map(regionData => (
        <tr key={regionData.id}>
          <td>{regionData.name}</td>
          <td className={regionActiveCasesPerMillionStyle(regionData)}>{regionData.active_cases_per_million}</td>
          <td className={regionFullyVaccinatedProportionStyle(regionData)}>{regionData.fully_vaccinated_proportion * 100}</td>
          <td className={regionVulnerableProportionStyle(regionData)}>{regionData.vulnerable_proportion * 100}</td>
      </tr>
      ))}
    </tbody>
  </table>)
}

export default CovidStats;
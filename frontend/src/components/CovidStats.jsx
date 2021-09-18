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


function CovidStats(props) {
  const { displayHeader } = props;

  return (
  <table className="covid-stats">
    {displayHeader &&
      <thead>
        <tr>
          <th>City</th>
          <th>Active Cases</th>
          <th>Fully Vaxxed</th>
          <th>Daily Deaths</th>
        </tr>
      </thead>
    }
    <tbody>
      <tr>
        <td>Toronto</td>
        <td className="safe">1,000</td>
        <td>1,000</td>
        <td>1,000</td>
      </tr>
      <tr>
        <td>Toronto</td>
        <td>1,000</td>
        <td>1,000</td>
        <td className="warning">1,000</td>
      </tr>
      <tr>
        <td>Toronto</td>
        <td>1,000</td>
        <td>1,000</td>
        <td>1,000</td>
      </tr>
    </tbody>
  </table>)
}

export default CovidStats;
export function regionActiveCasesPerMillionStyle(regionData) {
  return regionData.active_cases_per_million <= 700 ? 'safe' : 'warning';
}

export function regionFullyVaccinatedProportionStyle(regionData) {
  return regionData.fully_vaccinated_proportion > 0.65 ? 'safe' : 'warning';
}

export function regionVulnerableProportionStyle(regionData) {
  return regionData.vulnerable_proportion <= 0.35 ? 'safe' : 'warning';
}

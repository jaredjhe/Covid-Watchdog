import React from 'react'

const RegionData = React.createContext([])
export default RegionData;

export const RegionDataProvider = (props) => {
  const regionData = {
    ON: [
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
    },
  ],
    BC: [
      {
        name: "Vancouver",
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
      },
    ]
  }

  return (
    <RegionData.Provider value={regionData}>
      {props.children}
    </RegionData.Provider>
  )
}
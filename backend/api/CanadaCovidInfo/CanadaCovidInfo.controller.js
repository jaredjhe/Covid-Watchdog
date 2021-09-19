import { response } from "express"
import request from "request"
import fetch from "node-fetch"

const population = {
    ON: 14789778,
    QC: 8585523,
    BC: 5174724,
    MB: 1382904,
    NT: 44991,
    NS: 982326,
    NU: 39536,
    PE: 160536,
    SK: 1179906,
    YT: 42596,
    NB: 783721,
    AB: 4444277,
    NL: 520286
}

const baselineActiveCases = 700
const baselineFullyVacxxed = 0.75
const baselineVulnerable = 0.25
const vaccinatedRiskConstant = 0.0008

function getDateFormat (date) {
    var dd = date.getDate();

    var mm = date.getMonth()+1; 
    var yyyy = date.getFullYear();
    
    if(dd<10) 
    {
        dd='0'+dd;
    } 

    if(mm<10) 
    {
        mm='0'+mm;
    } 

    return (dd+'-'+mm+'-'+yyyy);

}

function getRegionInfo (regionsList, province) {

}


/**
 * Canada Covid Info class.
 */
export default class CanadaCovidInfo {

    /**
     * Retrives covid info for province and responds with filtered province info.
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    static async asyncGetCovidInfoProvince(req, res, next) {
        let province = (req.params.prov)?.toUpperCase()
        

        request(`https://api.opencovid.ca/summary?loc=${province}`, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let data = JSON.parse(body)["summary"]
                for (let elem in data) {       

                    let active_cases_per_million = 1000000 * (data[elem]["cumulative_cases"] - data[elem]["cumulative_deaths"] - data[elem]["cumulative_recovered"]) / population[province]
                    let active_cases_per_million_safe =  active_cases_per_million <= baselineActiveCases

                    let fully_vaccinated_proportion = data[elem]["cumulative_cvaccine"] / population[province]
                    let fully_vaccinated_proportion_safe = fully_vaccinated_proportion >= baselineFullyVacxxed

                    let vulnerable_proportion = ((population[province] - data[elem]["cumulative_cvaccine"])/ population[province]) + vaccinatedRiskConstant
                    let vulnerable_proportion_safe = vulnerable_proportion <= baselineVulnerable

                    let isSafe = false

                    if ((active_cases_per_million_safe && fully_vaccinated_proportion_safe) || 
                    (active_cases_per_million_safe && vulnerable_proportion_safe) ||
                    (fully_vaccinated_proportion_safe && vulnerable_proportion_safe)) {
                        isSafe = true
                    }

                    let finalResponse = {
                        prov: province,
                        date: data[elem]["date"],
                        new_cases: data[elem]["cumulative_cases"] - data[elem]["cumulative_deaths"] - data[elem]["cumulative_recovered"],
                        new_death: data[elem]["change_fatalities"],
                        active_cases: data[elem]["active_cases"],
                        total_cases: data[elem]["cumulative_cases"],
                        total_death: data[elem]["cumulative_deaths"],
                        fully_vaccinated: data[elem]["cumulative_cvaccine"],
                        active_cases_per_million: active_cases_per_million,
                        active_cases_per_million_safe: active_cases_per_million_safe,
                        fully_vaccinated_proportion: fully_vaccinated_proportion,
                        fully_vaccinated_proportion_safe: fully_vaccinated_proportion_safe,
                        vulnerable_proportion: vulnerable_proportion,
                        vulnerable_proportion_safe: vulnerable_proportion_safe,
                        isSafe: isSafe,
                        regions: []
                    }

                    return new request('https://api.opencovid.ca/other?stat=hr', function (regionError, regionResponse, regionBody) {
                        if (!regionError && regionResponse.statusCode == 200) {
                            let region = JSON.parse(regionBody)["hr"]
            
                            if (region !== undefined) {
                                let regionList = []
                                for (var elem in region) {
                                    if (region[elem]["province_short"] == province) {
                                        let regionInfo = {
                                            hr_uid: region[elem]["HR_UID"],
                                            health_region: region[elem]["health_region"],
                                            health_region_health_org:  region[elem]["health_region_esri"],
                                            prov:  region[elem]["province_short"]
                                        }
                                        regionList.push(regionInfo)  
                                    }
                                }
                                finalResponse.regions = regionList
                            }
                            res.json(finalResponse)
                            return
                        } else {
                            res.json(finalResponse)
                            return
                        }
                    });            
                }
                res.status(400).json({ error: "Province not found" })
                return
            } else {
                res.status(404).json({ error: "Not found" })
                return
            }
        });
    }


    static async asyncGetCovidInfoRegion(req, res, next) {
        let province = req.params.prov
        let regionId = parseInt(req.params.regId) 

        var today = new Date();
        var date = new Date(today)

        date.setDate(date.getDate() - 1)
        
        let dateStr = getDateFormat(date)
        request('https://api.covid19tracker.ca/summary/split/hr', function (hrError, regionsJson, hrBody) {
            if (!hrError && regionsJson.statusCode == 200) {
                let data = JSON.parse(hrBody)["data"]

                for (let elem in data) {
                    if (data[elem]["hr_uid"] == regionId) {
                        let finalResponse = {
                            prov: province,
                            region: null,
                            date: data[elem]["date"],
                            new_cases: data[elem]["change_cases"],
                            new_death: data[elem]["change_fatalities"],
                            total_cases: data[elem]["total_cases"],
                            total_death: data[elem]["total_fatalities"],
                            fully_vaccinated: data[elem]["total_vaccinated"],
                            active_cases: "",
                            population: "",
                            covid_watchdog_scale:"",
                            active_cases_per_million: null,
                            active_cases_per_million_safe: null,
                            fully_vaccinated_proportion: null,
                            fully_vaccinated_proportion_safe: null,
                            vulnerable_proportion: null,
                            vulnerable_proportion_safe: null,
                            isSafe: null
                        }

                        return new  request('https://api.opencovid.ca/other?stat=hr', function (popError, popResponse, popBody) {
                            if (!popError && popResponse.statusCode == 200) {
                                let regionList = JSON.parse(popBody)["hr"]

                                for (var i in regionList) {
                                    if (regionList[i]["HR_UID"] == regionId) {
                                        let regionPop = regionList[i]["pop"]
                                        finalResponse.population = regionPop
                                        finalResponse.region = regionList[i]["health_region"]

                                        return  new request(`https://api.opencovid.ca/timeseries?stat=cases&loc=${regionId}&date=${dateStr}`, function (casesError, casesResponse, casesBody){
                                            if (!casesError && casesResponse.statusCode == 200) {
                                                let caseData = JSON.parse(casesBody)["cases"][0]

                                                if (caseData.length !== 0) {
                                                    
                                                    let active_cases_per_million = 1000000 * (caseData["cases"]) / regionPop
                                                    let active_cases_per_million_safe =  active_cases_per_million <= baselineActiveCases
                                
                                                    let fully_vaccinated_proportion = data[elem]["total_vaccinated"] / regionPop
                                                    let fully_vaccinated_proportion_safe = fully_vaccinated_proportion >= baselineFullyVacxxed
                                
                                                    let vulnerable_proportion = ((regionPop - data[elem]["total_vaccinated"])/ regionPop) + vaccinatedRiskConstant
                                                    let vulnerable_proportion_safe = vulnerable_proportion <= baselineVulnerable

                                                    let isSafe = false

                                                    if ((active_cases_per_million_safe && fully_vaccinated_proportion_safe) || 
                                                    (active_cases_per_million_safe && vulnerable_proportion_safe) ||
                                                    (fully_vaccinated_proportion_safe && vulnerable_proportion_safe)) {
                                                        isSafe = true
                                                    }

                                                    finalResponse.active_cases_per_million = active_cases_per_million
                                                    finalResponse.active_cases_per_million_safe = active_cases_per_million_safe
                                                    finalResponse.fully_vaccinated_proportion = fully_vaccinated_proportion
                                                    finalResponse.fully_vaccinated_proportion_safe = fully_vaccinated_proportion_safe
                                                    finalResponse.vulnerable_proportion = vulnerable_proportion
                                                    finalResponse.vulnerable_proportion_safe = vulnerable_proportion_safe
                                                    finalResponse.isSafe = isSafe

                                                    res.json(finalResponse)
                                                    return

                                                }
                                            } else {
                                                res.status(400).json({ error: "Province or region not found" })
                                                return
                                            }
                                        });
                                    }
                                }
                            } else {
                                res.status(404).json({ error: "Not found" })
                                return
                            }
                        });
                        res.json(finalResponse)
                        return
                    } 
                }
                res.status(400).json({ error: "Province or region not found" })
                return
            }
        });

    }


    static async asyncGetCovidInfoProvinceAllRegion(req, res, next) {
        let province = req.params.prov

        const regionsResponse = await fetch(`https://api.covid19tracker.ca/province/${province}/regions`)

        const regionList = await regionsResponse.json()
        
        let fetchCalls = []

        for (var elem in regionList) {

            fetchCalls.push(
                fetch (`http://localhost:5000/api/v1/CanadaCovidInfo/${province}/${regionList[elem]["hr_uid"]}/regionInfo`)
                .then(response => response.json()))
        }

        let responses = await Promise.all(fetchCalls)



        res.json(responses)
        return   
    }


}
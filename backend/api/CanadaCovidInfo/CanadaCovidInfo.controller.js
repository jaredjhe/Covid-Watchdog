import request from "request"

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
        let prov = req.params.prov
        request('https://api.covid19tracker.ca/summary/split', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let data = JSON.parse(body)["data"]
                for (let elem in data) {
                    if (data[elem]["province"] === prov) {
                        let finalResponse = {
                            prov: data[elem]["province"],
                            date: data[elem]["date"],
                            new_cases: data[elem]["change_cases"],
                            new_death: data[elem]["change_fatalities"],
                            total_cases: data[elem]["total_cases"],
                            total_death: data[elem]["total_fatalities"],
                            fully_vaccinated: data[elem]["total_vaccinated"]
                        }
                        res.json(finalResponse)
                        return
                    }
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
        let region = req.params.reg.toUpperCase() 
        
        request('https://api.covid19tracker.ca/regions', function (regionError, regionResponse, regionBody) {
            if (!regionError && regionResponse.statusCode == 200) {
                let regionData = JSON.parse(regionBody)["data"]

                for (let elem in regionData) {
                    let regionHealthService = (regionData[elem]["engname"]).toString().toUpperCase()

                    if (regionData[elem]["province"] === province && regionHealthService.includes(region) !== -1) {
                        let regionId = regionData[elem]["hr_uid"]

                        return new request('https://api.covid19tracker.ca/summary/split/hr', function (error, response, body) {
                            if (!error && response.statusCode == 200) {
                                let data = JSON.parse(body)["data"]
                                for (let obj in data) {
                                    if (data[obj]["hr_uid"] === regionId) {
                                        let finalResponse = {
                                            prov: province,
                                            reg: region,
                                            date: data[elem]["date"],
                                            new_cases: data[elem]["change_cases"],
                                            new_death: data[elem]["change_fatalities"],
                                            total_cases: data[elem]["total_cases"],
                                            total_death: data[elem]["total_fatalities"],
                                            fully_vaccinated: data[elem]["total_vaccinated"]
                                        }

                                        
                                        res.json(finalResponse)
                                        return
                                    } 
                                }
                                res.status(400).json({ error: "Province or region not found" })
                                return
                            }
                        });
                        break
                    }                   
                }
                res.status(400).json({ error: "Province or region not found" })
                return
            } else {
                res.status(404).json({ error: "Not found" })
                return
            }
        });
    }
}
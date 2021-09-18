import express from "express"
import CanadaCovidInfo from "./CanadaCovidInfo.controller.js"

const router = express.Router()

router.route("/:prov/proviceInfo").get(CanadaCovidInfo.asyncGetCovidInfoProvince)
router.route("/:prov/:regId/regionInfo").get(CanadaCovidInfo.asyncGetCovidInfoRegion)


export default router
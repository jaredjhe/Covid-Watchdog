import express from "express"
import CanadaCovidInfo from "./CanadaCovidInfo.controller.js"

const router = express.Router()

router.route("/:prov/provinceInfo").get(CanadaCovidInfo.asyncGetCovidInfoProvince)
router.route("/:prov/:regId/regionInfo").get(CanadaCovidInfo.asyncGetCovidInfoRegion)
router.route("/:prov/allRegionInfo").get(CanadaCovidInfo.asyncGetCovidInfoProvinceAllRegion)



export default router
import express from "express"
import cors from "cors"
import CanadaCovidInfo from "./api/CanadaCovidInfo/CanadaCovidInfo.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/CanadaCovidInfo", CanadaCovidInfo)
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))

export default app
import express from "express";
import cors from "cors"
import { router as mainRouter} from "./routes/index"

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/v1",mainRouter)

app.listen(3000)


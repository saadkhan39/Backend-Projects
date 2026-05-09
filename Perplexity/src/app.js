import express from "express"


const app = express()
app.use(express.json())

//routes
import authRoutes from "./routes/auth.routes.js"
app.use("/api/auth",authRoutes)

export default app
const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const path = require("path")

const app = express()

app.set("trust proxy", 1)

app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: "https://moodify-woks.onrender.com",
  credentials: true
}))

app.use(express.static(path.join(process.cwd(), "public")))



// routes
const authRoutes = require("./routes/auth.routes")
const songRoutes = require("./routes/song.routes")

app.use("/api/auth", authRoutes)
app.use("/api/songs", songRoutes)

// fallback route
app.use((req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "index.html"))
})

module.exports = app
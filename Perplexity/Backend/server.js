import "dotenv/config"
import http, { createServer } from "http"
import app from "./src/app.js"
import connectToDb from "./src/config/database.js"
import { initSocket } from "./src/socket/server.socket.js"

connectToDb()

const httpServer = http.createServer(app)

initSocket(httpServer)

httpServer.listen(3000, () => {
    console.log("server is running on port 3000")
})
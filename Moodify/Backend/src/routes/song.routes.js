const express = require("express")
const songController = require("../controller/song.controller")
const upload = require("../middleware/upload.middleware")

const songRouter = express.Router()


// /POST  /api/songs/
songRouter.post("/",upload.single("song"),songController.uploadSong)


songRouter.get("/",songController.getSong)


module.exports = songRouter
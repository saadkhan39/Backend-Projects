const mongoose = require("mongoose")

async function connecToDb() {
    mongoose.connect(process.env.MONGO_URI)
    console.log("connected to DB");
    
}

module.exports = connecToDb
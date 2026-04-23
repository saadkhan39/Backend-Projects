const mongoose = require("mongoose")

async function connectToDb() {
    mongoose.connect(process.env.MONGO_URI)
    console.log("connected to DB");
    
}

module.exports = connectToDb
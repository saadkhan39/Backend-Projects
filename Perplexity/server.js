import "dotenv/config"
import app from "./src/app.js"
import connectToDb from "./src/config/database.js";
import { testAi } from "./src/service/ai.service.js";
import { testMistralAi } from "./src/service/ai.service.js";

connectToDb()

testAi()
testMistralAi()


app.listen(3000,()=>{
    console.log("server is running on port 3000");
    
})
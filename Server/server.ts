import 'dotenv/config'


import app from "./src/app.js";
import connectToDb from "./src/database/index.js";


connectToDb()

app.listen(process.env.PORT || 3000, () => {
    console.log(`server is listenting at port ${process.env.PORT || 3000}`)
})
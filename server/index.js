const express = require("express")
const routes = require("./routes/api/api")

const app = express()
const port = 8005

app.use(express.json())

//routes

app.use("/",routes)

app.listen(port,()=>{
    console.log('server is listening')
  })
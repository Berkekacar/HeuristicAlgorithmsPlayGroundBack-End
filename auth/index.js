const express = require("express")
const router = require("./routes/api/api")
const cookieParser = require('cookie-parser');

const app = express()
const port = 8005


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use("/", router)

app.all("*", (req, res) => {
    res.sendStatus(404)
})
app.listen(port, () => {
    console.log('Server is listening')
})

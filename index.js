const express = require("express")
const urlRoutes = require('./routes/url')
const {connectDB} = require('./connect')
const app = express()
const URL = require('./models/url')
connectDB()

app.use(express.json())
app.use('/url' , urlRoutes)

app.listen(8001 , ()=> console.log("server started"))
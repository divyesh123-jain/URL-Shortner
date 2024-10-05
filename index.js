const express = require("express")
const urlRoutes = require('./routes/url')
const {connectDB} = require('./connect')
const app = express()
const url = process.env.MONGODB_URL
const URL = require('./models/url')
require('dotenv').config();
connectDB()

app.use(express.json())
app.use('/url' , urlRoutes)

app.listen(8002 , ()=> console.log("server started"))
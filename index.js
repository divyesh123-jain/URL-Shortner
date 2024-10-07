const express = require("express")
const urlRoutes = require('./routes/url')
const userRoutes = require('./routes/user')
const {connectDB} = require('./connect')
const app = express()
const url = process.env.MONGODB_URL
const URL = require('./models/url')
require('dotenv').config();
connectDB()

app.use(express.json())
app.use('/url' , urlRoutes)
app.use('/user' , userRoutes)

app.listen(8000 , ()=> console.log("server started"))
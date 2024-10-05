const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: "./.env" })
const url = process.env.MONGODB_URL
async function connectDB(){
    return mongoose.connect(url)
    .then(()=>console.log("mongodb is connected"))
    .catch((err) => console.log("mongodb is not connected" , err))
}

module.exports = {
    connectDB
}
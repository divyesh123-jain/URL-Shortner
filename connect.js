const mongoose = require('mongoose');

async function connectDB(url){
    return mongoose.connect("mongodb+srv://divyeshj301:ApHOaRPsQC6hIhER@cluster1.9rlza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1")
    .then(()=>console.log("mongodb is connected"))
    .catch((err) => console.log("mongodb is not connected" , err))
}

module.exports = {
    connectDB
}
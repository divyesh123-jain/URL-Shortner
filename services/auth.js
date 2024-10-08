const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: "./.env" })
const secret = process.env.JWT_SECRET;

const sessionIdtoUserMap = new Map();

function setUser(user){

    try{
        return jwt.sign({
            _id: user._id,
            email:user.email,
        } , secret) 
    }

    catch(err){
        return null
    }
  
    
    
}

function getUser(token){
    return jwt.verify(token , secret)
}

module.exports = {
    setUser,
    getUser
}
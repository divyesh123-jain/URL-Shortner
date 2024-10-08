const User = require('../models/user');
const {v4 : uuidv4}  = require("uuid")
const {setUser} = require('../services/auth')
async function handleUserSignup(req ,res){

    const {name , email , password} = req.body
    await User.create({
        name, 
        email,
        password
    })

    res.json({message: 'User created'})
}
async function handleUserLogin(req ,res){

    const { email , password} = req.body
   const user=  await User.findOne(
        {
            email,
            password
        }
    )
    if(!user) return res.json({message: 'Invalid Email or Password'})
   const token =  setUser( user)
    // res.cookie('uid' , token)
    res.json({token })
}
module.exports = {
    handleUserSignup,
    handleUserLogin
}
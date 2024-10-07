const User = require('../models/user');

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
    await User.findOne(
        {
            email,
            password
        }
    )
    if(!User ) return res.json({message: 'Invalid Email or Password'})


    res.json({message: 'User Login'})
}
module.exports = {
    handleUserSignup,
    handleUserLogin
}
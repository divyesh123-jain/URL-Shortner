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

module.exports = {
    handleUserSignup
}
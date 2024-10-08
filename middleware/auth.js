const {getUser} = require('../services/auth')
async function requestToLoginUserOnly(req ,res ,next){
    const userUid =  req.headers["authorization"]
    console.log(req.headers)

    if(!userUid) return res.json({message: 'User not logged in'})

    const user = getUser(userUid)
    const token = userUid.split('Bearer ')[1] // Bearer: [wjyqgrhuy3wjhweh] //taking the 1st index to get that aaray

    if(!user) return res.json({message: 'User not logged in'})

        req.user = user
        next()
}

module.exports = {
    requestToLoginUserOnly
}
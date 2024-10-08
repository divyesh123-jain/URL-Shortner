const {getUser} = require('../services/auth')
async function requestToLoginUserOnly(req ,res ,next){
    const userUid =  req.cookies?.uid

    if(!userUid) return res.json({message: 'User not logged in'})

    const user = getUser(userUid)

    if(!user) return res.json({message: 'User not logged in'})

        req.user = user
        next()
}

module.exports = {
    requestToLoginUserOnly
}
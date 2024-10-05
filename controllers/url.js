
const URL = require('../models/url');
const shortid = require('shortid');


async function handleGenerateShortURL(req , res){
    const body = req.body
    if(!body.url) return res.status(404).json({error: "url is required"})
    const shortID = shortid()
    await URL.create({
       shortID:shortID,
       redirectURL: body.url,
       totalclicks:[]
    }) 
    return res.json({_id : shortID})
}

async function handleGetRedirectURL(req , res){
    const shortID = req.params.shortID
   const entry =  await URL.findOneAndUpdate({
        shortID
    } , {$push:{
        totalclicks:{
            timestamps:Date.now()
        }
    }})
    res.redirect(entry.redirectURL)
}

async function handleanalytics(req ,res){
    const shortID = req.params.shortID
    const result = await URL.findOne({
        shortID
    })
    res.json({totalclicks:result.totalclicks.length , analytics:result.totalclicks})
}

async function handlegetAllShortURLData(req , res){
    const result = await URL.find({})
    res.json(result)
}

module.exports = {
    handleGenerateShortURL,
    handleGetRedirectURL,
    handleanalytics,
    handlegetAllShortURLData
    
 
}
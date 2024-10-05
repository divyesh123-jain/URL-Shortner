const express = require("express")
const router = express.Router()
const {handleGenerateShortURL , handleGetRedirectURL , handleAnalytics , handleGetAllShortURLData} = require('../controllers/url')
router.post('/' , handleGenerateShortURL)
router.get('/' , handleGetAllShortURLData)

router.get('/:shortID' , handleGetRedirectURL)

router.get('/analytics/:shortID' , handleAnalytics)


module.exports = router
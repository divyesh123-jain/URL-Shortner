const express = require("express")
const router = express.Router()
const {handleGenerateShortURL , handleGetRedirectURL , handleanalytics} = require('../controllers/url')
router.post('/' , handleGenerateShortURL)

router.get('/:shortID' , handleGetRedirectURL)

router.get('/analytics/:shortID' , handleanalytics)


module.exports = router
const express = require('express')
const router = express.Router()

const schoolController = require('../controllers/schoolController')

router.post('/addSchools',schoolController.addschools)

router.get('/listSchools', schoolController.getschools)

module.exports = router
const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const report = require('./report.js')

router.get('/', Controller.getHome )
router.use('/reports', report)





module.exports = router
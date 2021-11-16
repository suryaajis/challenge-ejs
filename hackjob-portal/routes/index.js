const express = require('express')
const router = express.Router()
const jobRouter = require('./jobRouter')
const hiringRouter = require('./hiringRouter')
const Controller = require('../controllers/controller')

router.get('/', Controller.getHome )

router.use('/jobs', jobRouter)
router.use('/hiring', hiringRouter)

module.exports = router
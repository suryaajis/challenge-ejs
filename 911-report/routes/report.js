const express = require('express')
const Controller = require('../controllers/controller')
const report = express.Router()

// /reports
report.get('/', Controller.listReports )

report.get('/add', Controller.addFormReport )
report.post('/add', Controller.addReport)

report.get('/:id', Controller.editFormReport )
report.post('/:id/edit', Controller.editReport )

report.get('/:id/delete', Controller.deleteReport )



module.exports = report
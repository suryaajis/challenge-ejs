const express = require('express')
const jobRouter = express.Router()
const ControllerJob = require('../controllers/controllerJob')

// localhost /jobs
jobRouter.get('/', ControllerJob.listJobs )

jobRouter.get('/add', ControllerJob.addFormJob )
jobRouter.post('/add', ControllerJob.addPostJob )

jobRouter.get('/:id/detail', ControllerJob.detailJob )

jobRouter.get('/:id/add-salary', ControllerJob.addFormSalaryJob )
jobRouter.post('/:id/add-salary', ControllerJob.addPostSalaryJob )

jobRouter.get('/:id/edit', ControllerJob.editFormJob )
jobRouter.post('/:id/edit', ControllerJob.editPostJob )

module.exports = jobRouter
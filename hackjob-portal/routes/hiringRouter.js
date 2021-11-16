const express = require('express')
const hiringRouter = express.Router()
const ControllerHire = require('../controllers/controllerHire')

// localhost /hiring
hiringRouter.get('/', ControllerHire.listHiring )

hiringRouter.get('/:jobId/detail', ControllerHire.detailHiring )

hiringRouter.get('/:jobId/apply', ControllerHire.formApplyJob )
hiringRouter.post('/:jobId/apply', ControllerHire.postApplyJob )

hiringRouter.get('/:jobId/apply/:applicantId/approve', ControllerHire.approve )

hiringRouter.get('/:jobId/apply/:applicantId/reject', ControllerHire.reject )

module.exports = hiringRouter
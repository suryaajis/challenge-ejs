const {Department, Job, Salary, Applicant} = require('../models')
const { Op } = require("sequelize");
const formatDate = require('../helpers/formatDate')

class ControllerHire {
  static listHiring(req, res) {
    const {search} = req.query

    Job.scopeNotVacantJob(Department, search)
    .then(data => {
      res.render('hiring/listHiring', {dataJobs:data, formatDate})
    })
    .catch(err => {
      res.send(err)
    })
  }

  static detailHiring(req, res) {
    let data = {
      job: {},
      applicants: {}
    }

    Job.findByPk(+req.params.jobId, {
      include: [Department, Salary, Applicant],
      raw: true
    })
    .then(job => {
      data.job = job
      return Applicant.findAll({
        where: {JobId: +req.params.jobId},
        raw: true
      })
    })
    .then(applicant => {
      data.applicants = applicant
      res.render('hiring/detailHiring', {data, formatDate})
    })
    .catch(err => {
      res.send(err)
    })
  }

  static formApplyJob(req, res) {
    Job.findByPk(+req.params.jobId, {
      include: [Department],
      raw: true
    })
    .then(job => {
      res.render('hiring/applyHiring', {dataJob:job})
    })
    .catch(err => {
      res.send(err)
    })
  }
  static postApplyJob(req, res) {
    const {fullName, email, phone, gender} = req.body
    // const applicant = Applicant.build({fullName, phone})
    let newApplicant = {
      fullName,
      gender,
      email,
      phone,
      JobId: +req.params.jobId,
      createdAt: new Date(),
      updatedAt: new Date()
    }


    Applicant.create(newApplicant)
    .then(() => {
      res.redirect(`/hiring/${+req.params.jobId}/detail`)
    })
    .catch(err => {
      err = err.errors.map(el => {
        return el.message
      })
      res.send(err)
    })
  }

  static approve(req, res) {
    Applicant.update({ status: "approved"}, {
      where: {
        id: +req.params.applicantId
      }
    })
    .then(() => {
      res.redirect(`/hiring/${+req.params.jobId}/detail`)
    })
    .catch(err => {
      res.send(err)
    })
  }

  static reject(req, res) {
    Applicant.update({ status: "rejected"}, {
      where: {
        id: +req.params.applicantId
      }
    })
    .then(() => {
      res.redirect(`/hiring/${+req.params.jobId}/detail`)
    })
    .catch(err => {
      res.send(err)
    })
  }
}

module.exports = ControllerHire
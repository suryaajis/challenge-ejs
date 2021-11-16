const {Department, Job, Salary} = require('../models/index')
const formatDate = require('../helpers/formatDate')

class ControllerJob {
  static listJobs(req, res) {
    Job.findAll({
      include: [
          { model: Department }
      ],
      raw: true,
      order: [['createdAt', 'DESC']]
  })
    .then(data => {
      res.render('jobs/listJobs', {dataJobs:data, formatDate})
    })
    .catch(err => {
      console.log(err)
      res.send(err)
    })
  }

  static addFormJob(req, res) {
    Department.findAll()
    .then(data => {
      res.render('jobs/addJob', {dataDepartment:data})
    })
    .catch(err => {
      res.send(err)
    })
  }
  static addPostJob(req, res) {
    let newJob = {
      DepartmentId: +req.body.DepartmentId,
      title: req.body.title,
      vacancy: req.body.vacancy,
      requirement: req.body.requirement,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    Job.create(newJob)
    .then(() => {
      res.redirect('/jobs')
    })
    .catch(err => {
      res.send(err)
    })
  }

  static detailJob(req, res) {
    let id = Number(req.params.id);
		Job.findByPk(id, { 
      include: [Department, Salary],
      raw:true 
    })
			.then(data => {
				res.render('jobs/detailJob', {dataDetail:data, formatDate})
			})
			.catch(err => {
				res.send(err);
			});
  }

  static addFormSalaryJob(req, res) {
    Job.findByPk(+req.params.id, {
      raw:true
    })
    .then(data => {
      res.render('jobs/addSalary', {dataJob:data})
    })
    .catch(err => {
      res.send(err)
    })
  }
  static addPostSalaryJob(req, res) {
    const {baseSalary, bonusSalary} = req.body
    let newSalary = {
      JobId: +req.params.id,
      amount: +baseSalary,
      bonus: +bonusSalary,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    Salary.create(newSalary)
    .then(() => {
      res.redirect(`/jobs/${+req.params.id}/detail`)
    })
    .catch(err => {
      res.send(err)
    })
  }

  static editFormJob(req, res) {
    let data = {
      job: {},
      deparments: {}
    }

    Job.findByPk(+req.params.id, {
      raw:true
    })
    .then(job => {
      data.job = job
      return Department.findAll({raw:true})
    })
    .then(departments => {
      data.deparments = departments
      
      res.render('jobs/editJob', {data})
    })
    .catch(err => {
      res.send(err)
    })
  }
  static editPostJob(req, res) {
    const {title, DepartmentId, requirement, vacancy} = req.body
    let updateJob = {
      DepartmentId: +DepartmentId,
      title,
      vacancy: +vacancy,
      requirement,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    Job.update(updateJob, {
      where: {
        id: +req.params.id
      }
    })
    .then(() => {
      res.redirect(`/jobs/${+req.params.id}/detail`)
    })
    .catch(err => {
      res.send(err)
    })
  }
}


module.exports = ControllerJob
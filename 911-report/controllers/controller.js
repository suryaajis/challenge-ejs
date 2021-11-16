const {Report, sequelize} = require('../models')
const { Op } = require("sequelize");

class Controller {
  static getHome(req, res) {
    res.render('home')
  }

  static listReports(req, res) {
    const {event, age} = req.query
    const selects = {
      where: {},
      order: [['dateOfEvent', 'DESC']] 
    }

    if(event) {
      selects.where.event = {[Op.iLike] : `%${event}%`} 
    }
    if(age) {
      selects.where.age = {[Op.eq] : +age}
    }

    let data = {
      dataReports: {},
      age: {
        max: null,
        min: null,
        avg: null
      }
    }


    Report.findAll(selects)
    .then(dataReport => {
      data.dataReports = dataReport
      return Report.max('age')
    })
    .then(maxAge => {
      data.age.max = maxAge
      return Report.min('age')
    })
    .then(minAge => {
      data.age.min = minAge
      return Report.averageAge()
    })
    .then(avgAge => {
      data.age.avg = Number(avgAge)
      // data.age.max = null
      // data.age.min = null
      // data.age.avg = null
      
      res.render('listReports', {dataReport:data.dataReports, dataAge:data.age})
    })
    .catch(err => {
      res.send(err)
    })
  }


  static addFormReport(req, res) {
    res.render('addReport')
  }
  static addReport(req, res) {
    const newReport = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: Number(req.body.age),
      email: req.body.email,
      nik: req.body.nik,
      event: req.body.event,
      description: req.body.description,
      photo: req.body.photo,
      dateOfEvent: req.body.dateOfEvent
    }

    Report.create(newReport)
    .then(() => {
      res.redirect('/reports')
    })
    .catch(err => {
      res.send(err)
    })
  }


  static editFormReport(req, res) {
    Report.findByPk(Number(req.params.id))
    .then(data => {
      res.render('editReport', {data})
    })
    .catch(err => {
      res.send(err)
    })
  }
  static editReport(req, res) {
    const updateReport = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: Number(req.body.age),
      email: req.body.email,
      nik: req.body.nik,
      event: req.body.event,
      description: req.body.description,
      photo: req.body.photo,
      dateOfEvent: req.body.dateOfEvent
    }

    Report.update(updateReport, {
      where: {
        id: Number(req.params.id)
      }
    })
    .then(() => {
      res.redirect('/reports')
    })
    .catch(err => {
      res.send(err)
    })
  }

  static deleteReport(req, res) {
    Report.destroy({
      where:{
        id:Number(req.params.id)
      }
    })
    .then(() => {
      res.redirect('/reports')
    })
    .catch(err => {
      res.send(err)
    })
  }
}



module.exports = Controller
'use strict';
const {
  Model
} = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    get formatDate(){
      const event = new Date(this.dateOfEvent);
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return event.toLocaleDateString('id-ID', options)
    }

    get formatDateOfEvent(){
      let date = new Date(this.dateOfEvent)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()

      if( month < 10) {
        month = `0${month}`
      }
      if( day < 10 ) {
        day = `0${day}`
      }

      return `${year}-${month}-${day}`
      
    }

    static averageAge() {
      return new Promise((resolve, reject) => {
        Report.findAll({
          attributes: [
            [sequelize.fn('AVG', sequelize.col('age')), 'avgAge']
          ],
          raw:true
        })
        .then(dataAvg => {
          let averageAge = dataAvg[0].avgAge
          resolve(Number(averageAge).toFixed(0))
        })
        .catch(err => {
          reject(err)
        })
      }) 
    }
  };
  Report.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.INTEGER,
    email: DataTypes.STRING,
    nik: DataTypes.STRING,
    event: DataTypes.STRING,
    description: DataTypes.TEXT,
    photo: DataTypes.STRING,
    dateOfEvent: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};

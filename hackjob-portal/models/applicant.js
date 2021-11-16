'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Applicant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Applicant.belongsTo(models.Job, {foreignKey:"JobId"})
    }

    generateCode(jobId) {
      let name = this.fullName.split(' ').join('_')
      let phone = this.phone.slice(this.phone.length - 4)
      return `${name}_${phone}_${jobId}`
    }
  };
  Applicant.init({
    fullName: {
     type: DataTypes.STRING,
     validate: {
       notEmpty: {msg: 'Nama Lengkap Harus Diisi!'}
     }
    },
    gender: {
     type: DataTypes.STRING,
     defaultValue: '',
     validate: {
       notEmpty: {msg: 'Gender Belum Dipilih, Pilih Salah Satu!'}
     }
    },
    applicantCode: DataTypes.STRING,
    email: {
     type: DataTypes.STRING,
     validate: {
       notEmpty: {msg: 'Email Harus Diisi!'},
       isEmail: {msg: 'Format email tidak valid!'}
     }
    },
    phone: {
     type: DataTypes.STRING,
     validate: {
      notEmpty: {msg: 'Nomor Telepon Harus Diisi!'},
      isPhone(value){
        let zeroNum = value.slice(0,1)
        if( zeroNum === '0') {
          throw new Error('Tidak perlu menggunakan prefix 0 didepan nomer telepon')
        }
      }
     }
    },
    status: DataTypes.STRING,
    dateApplied: DataTypes.DATE,
    JobId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        instance.status = 'pending'
        instance.dateApplied = new Date()

        let name = instance.fullName.split(' ').join('_')
        let phone = instance.phone.slice(instance.phone.length - 4)
        instance.applicantCode = `${name}_${phone}_${instance.JobId}`
      }
    },
    sequelize,
    modelName: 'Applicant',
  });
  return Applicant;
};
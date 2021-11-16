'use strict';
const {
  Model, Op, where
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsTo(models.Department, {foreignKey: 'DepartmentId'})
      Job.hasOne(models.Salary, {foreignKey:'JobId'})
      Job.hasMany(models.Applicant, {foreignKey:"JobId"})
    }

    static scopeNotVacantJob(Department, search){
      let options = {
        where: {},
        include: [Department],
        raw: true,
        order: [['createdAt', 'DESC']]
      }

      if(search) {
        options.where.title = {[Op.iLike] : `%${search}%`}
      }

      options.where.vacancy = {[Op.gt]: 0}

      return Job.findAll(options);
    }
  };
  Job.init({
    DepartmentId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    vacancy: DataTypes.INTEGER,
    requirement: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};
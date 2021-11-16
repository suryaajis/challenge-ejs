'use strict';
const fs = require('fs')


module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     let data = JSON.parse(fs.readFileSync('./data/departements.json', 'utf-8'))
     data.forEach(dpt => {
       dpt.createdAt = new Date()
       dpt.updatedAt = new Date()
     })
     return queryInterface.bulkInsert('Departments', data, {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Departments', null, {})
  }
};

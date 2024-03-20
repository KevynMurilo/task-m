'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('to_do_list', [
        {
          task: "estudar Javascript",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          task: "estudar C#",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          task: "estudar Jython",
          createdAt: new Date(),
          updatedAt: new Date()
        },

      ] , {});
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('to_do_list', null, {});
  }
};

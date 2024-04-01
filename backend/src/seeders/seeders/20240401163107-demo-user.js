"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "user",
      [
        {
          email: "user2@gmail.com",
          username: "user2",
          password: "Hoa29072002",
        },
        {
          email: "user3@gmail.com",
          username: "user3",
          password: "Hoa29072002",
        },
        {
          email: "user4@gmail.com",
          username: "user4",
          password: "Hoa29072002",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

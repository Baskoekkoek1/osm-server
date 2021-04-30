"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "teams",
      [
        {
          name: "Hilversum United",
          offense: 4,
          defense: 2,
          played: 0,
          won: 0,
          lost: 0,
          draw: 0,
          points: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Real Zoetemeer",
          offense: 2,
          defense: 4,
          played: 0,
          won: 0,
          lost: 0,
          draw: 0,
          points: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "LFC Leiden",
          offense: 1,
          defense: 1,
          played: 0,
          won: 0,
          lost: 0,
          draw: 0,
          points: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dynamo Delft",
          offense: 1,
          defense: 2,
          played: 0,
          won: 0,
          lost: 0,
          draw: 0,
          points: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("teams", null, {});
  },
};

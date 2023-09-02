'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable(
      'Furniture',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        model: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        modelPath: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        snapshotPath: {
          type: Sequelize.STRING,
        },
        defaultScale: {
          type: Sequelize.FLOAT,
          defaultValue: 1,
        },
      },
      { timestamps: true },
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('Furniture-Type');
  },
};

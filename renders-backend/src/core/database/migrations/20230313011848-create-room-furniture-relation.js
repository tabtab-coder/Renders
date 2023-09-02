'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable(
      'RoomFurniture',
      {
        roomId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Rooms',
            key: 'id',
          },
        },
        furnitureId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Furniture',
            key: 'id',
          },
        },
        position: {
          type: Sequelize.ARRAY(Sequelize.INTEGER),
          allowNull: false,
        },
        rotation: {
          type: Sequelize.ARRAY(Sequelize.INTEGER),
          allowNull: false,
        },
        scale: {
          type: Sequelize.ARRAY(Sequelize.INTEGER),
          allowNull: false,
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
    return queryInterface.dropTable('RoomFurniture');
  },
};

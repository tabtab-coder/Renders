'use strict';

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
    await queryInterface.bulkInsert('Furniture', [
      {
        name: 'cat',
        model: 'cat',
        modelPath: 'assets/cat.gltf',
        snapshotPath: 'assets/cat-snapshot.jpg',
        defaultScale: 0.02,
      },
      {
        name: 'Wooden table',
        model: 'table',
        modelPath: 'assets/table.gltf',
        snapshotPath: 'assets/table-snapshot.jpg',
        defaultScale: 1.5,
      },
      {
        name: 'chest',
        model: 'accent_chest',
        modelPath: 'assets/accent_chest.glb',
        snapshotPath: 'assets/accent-chest-snapshot.jpg',
        defaultScale: 1.3,
      },
      {
        name: 'Modern Cabinet',
        model: 'modern-cabinet-hutch',
        modelPath: 'assets/modern_cabinet_hutch.glb',
        snapshotPath: 'assets/modern-cabinet-snapshot.jpg',
        defaultScale: 1.1,
      },
      {
        name: 'Simple chair',
        model: 'chair',
        modelPath: 'assets/chair.gltf',
        snapshotPath: 'assets/chair-snapshot.jpg',
        defaultScale: 1.3,
      },
      {
        name: 'Floor lamp',
        model: 'floor-lamp',
        modelPath: 'assets/floor-lamp.glb',
        snapshotPath: 'assets/floor-lamp-snapshot.jpg',
        defaultScale: 1.5,
      },
      {
        name: 'Old rustic stand',
        model: 'old-rustic-stand',
        modelPath: 'assets/old_rustic_stand.glb',
        snapshotPath: 'assets/old-rustic-stand-snapshot.jpg',
      },
      {
        name: 'Shoe cabinet',
        model: 'shoe-cabinet',
        modelPath: 'assets/shoe_cabinet.gltf',
        snapshotPath: 'assets/shoe-cabinet-snapshot.jpg',
        defaultScale: 2,
      },
      {
        name: 'Table lamp',
        model: 'table-lamp',
        modelPath: 'assets/table_lamp.glb',
        snapshotPath: 'assets/table-lamp-snapshot.jpg',
      },
    ]),
      {};
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Furniture', null, {});
  },
};

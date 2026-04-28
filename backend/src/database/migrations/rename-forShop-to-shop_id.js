'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('products', 'forShop', 'shop_id');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('products', 'shop_id', 'forShop');
  }
};

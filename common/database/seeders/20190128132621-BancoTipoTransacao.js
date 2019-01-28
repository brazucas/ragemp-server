'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('BancoTipoTransacao', [{
      id: '1',
      nome: 'Crédito',
      identificador: 'credito',
      dataCriado: new Date(),
      dataAtualizado: new Date(),
    }, {
      id: '2',
      nome: 'Débito',
      identificador: 'debito',
      dataCriado: new Date(),
      dataAtualizado: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};

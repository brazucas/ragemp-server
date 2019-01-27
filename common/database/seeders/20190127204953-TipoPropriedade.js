'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TipoPropriedade', [{
      id: '1',
      nome: 'Banco',
      identificador: 'banco',
    }, {
      id: '2',
      nome: 'Posto de Gasolina',
      identificador: 'posto-gasolina',
    }, {
      id: '3',
      nome: 'Bar',
      identificador: 'bar',
    }, {
      id: '4',
      nome: 'Lanchonete',
      identificador: 'lanchonete',
    }, {
      id: '5',
      nome: 'Restaurante',
      identificador: 'restaurante',
    }, {
      id: '6',
      nome: 'Auto Escola',
      identificador: 'auto-escola',
    }, {
      id: '7',
      nome: 'Locadora de Veículos',
      identificador: 'locadora-veiculos',
    }, {
      id: '8',
      nome: 'Loja de Armas',
      identificador: 'loja-armas',
    }, {
      id: '9',
      nome: 'Loja de Roupas',
      identificador: 'loja-roupas',
    }, {
      id: '10',
      nome: 'Loja de Utensílios',
      identificador: 'loja-utensilios',
    }, {
      id: '11',
      nome: 'Academia',
      identificador: 'academia',
    }, {
      id: '12',
      nome: 'Imobiliaria',
      identificador: 'imobiliaria',
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TipoPropriedade', null, {});
  }
};

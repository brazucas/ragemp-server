'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TipoPropriedade', [{
      id: '1',
      nome: 'Banco',
      identificador: 'banco',
      dataCriado: new Date(),
      dataAtualizado: new Date(),
    }, {
      id: '2',
      nome: 'Posto de Gasolina',
      identificador: 'posto-gasolina',
      dataCriado: new Date(),
      dataAtualizado: new Date(),
    }, {
      id: '3',
      nome: 'Bar',
      identificador: 'bar',
      dataCriado: new Date(),
      dataAtualizado: new Date(),
    }, {
      id: '4',
      nome: 'Lanchonete',
      identificador: 'lanchonete',
      dataCriado: new Date(),
      dataAtualizado: new Date(),
    }, {
      id: '5',
      nome: 'Restaurante',
      identificador: 'restaurante',
      dataCriado: new Date(),
      dataAtualizado: new Date(),
    }, {
      id: '6',
      nome: 'Auto Escola',
      identificador: 'auto-escola',
      dataCriado: new Date(),
      dataAtualizado: new Date(),
    }, {
      id: '7',
      nome: 'Locadora de Veículos',
      identificador: 'locadora-veiculos',
      dataCriado: new Date(),
      dataAtualizado: new Date(),
    }, {
      id: '8',
      nome: 'Loja de Armas',
      identificador: 'loja-armas',
      dataCriado: new Date(),
      dataAtualizado: new Date(),
    }, {
      id: '9',
      nome: 'Loja de Roupas',
      identificador: 'loja-roupas',
      dataCriado: new Date(),
      dataAtualizado: new Date(),
    }, {
      id: '10',
      nome: 'Loja de Utensílios',
      identificador: 'loja-utensilios',
      dataCriado: new Date(),
      dataAtualizado: new Date(),
    }, {
      id: '11',
      nome: 'Academia',
      identificador: 'academia',
      dataCriado: new Date(),
      dataAtualizado: new Date(),
    }, {
      id: '12',
      nome: 'Imobiliaria',
      identificador: 'imobiliaria',
      dataCriado: new Date(),
      dataAtualizado: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TipoPropriedade', null, {});
  }
};

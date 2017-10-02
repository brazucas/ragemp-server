var glob = require('glob');
var _ = require('underscore');
var fs = require('fs');
var util = require('util');

module.exports = {
  maps: [],
  mapSelected: null,

  loadMaps: function () {
    var maps = glob.sync("packages/minigames/maps/*.json");
    var self = this;

    _.forEach(maps, function (map) {
      self.maps.push(JSON.parse(fs.readFileSync(map, 'utf8')));
    })
  },

  getMaps: function () {
    return this.maps;
  },

  init: function () {
    this.loadMaps();
    console.log(this.getMaps().length + ' minigame(s) encontrado(s).');

    this.loadMinigame('resta1');
  },

  loadMinigame: function (id) {
    console.log('Carregando Minigame ' + id + '.');
    this.loadMap(id);
  },

  loadMap: function (id) {
    console.log('Carregando mapa ' + id + '.');
    var mapData = require('./maps/' + id + '.json');

    if (mapData) {
      if (mapData.Map && mapData.Map.Objects && mapData.Map.Objects.MapObject) {
        var loadedVehicles = 0, loadedProps = 0;

        _.forEach(mapData.Map.Objects.MapObject, function (object) {
          switch (object.Type) {
            case 'Prop':
              mp.objects.new(parseInt(object.Hash), new mp.Vector3(parseFloat(object.Position.X), parseFloat(object.Position.Y), parseFloat(object.Position.Z)), new mp.Vector3(parseFloat(object.Rotation.X), parseFloat(object.Rotation.Y), parseFloat(object.Rotation.Z)));
              ++loadedProps;
              break;
            case 'Vehicle':
              mp.vehicles.new(parseInt(object.Hash), new mp.Vector3(parseFloat(object.Position.X), parseFloat(object.Position.Y), parseFloat(object.Position.Z)));
              ++loadedVehicles;
              break;
            default:
              console.log('Objeto do tipo ' + object.Type + ' não pôde ser carregado.');
          }
        });

        console.log(mapData.Map.Objects.MapObject.length + ' objetos carregados (' + loadedVehicles + ' veículos, ' + loadedProps + ' objetos).');

        this.unloadCurrentMap();
      } else {
        console.log('O mapa ' + id + ' não implementa um ou várias propriedades como Map, Map.Objects ou Map.Objects.MapObject.');
      }
    } else {
      console.log('Mapa ' + id + ' não encontrado.');
    }
  },

  unloadCurrentMap: function () {
    console.log('Descarregando mapa atual.');

    var objectsLength = mp.objects.toArray().length;
    var vehiclesLength = mp.vehicles.toArray().length;

    mp.objects.forEach(function (object) {
      object.destroy();
    })

    mp.vehicles.forEach(function (vehicle) {
      vehicle.destroy();
    });

    console.log(objectsLength + ' objetos descarregados.');
    console.log(vehiclesLength + ' veículos descarregados.');
  }
}
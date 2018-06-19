import * as glob from "glob";
import * as fs from "fs";
import * as _ from "underscore";
import {StatusConsts} from "./consts/status";
import {MinigamesConsts} from "./consts/minigames";

declare const mp: Mp;

module.exports = {
  maps: [],
  mapSelected: null,
  status: null,

  loadMaps: function () {
    let maps = glob.sync("packages/minigames/maps/*.json");
    let self = this;

    _.forEach(maps, function (map: Buffer) {
      self.maps.push(JSON.parse(fs.readFileSync(map, 'utf8')));
    })
  },

  getMaps: function () {
    return this.maps;
  },

  init: function () {
    this.loadMaps();
    console.log(this.getMaps().length + ' minigame(s) encontrado(s).');

    this.status = StatusConsts.WAITING_PLAYERS;

    this.mainLoop();
  },

  loadMinigame: function (map) {
    console.log('Carregando Minigame ' + map.Map.Metadata.Name + '.');
    this.loadMap(map);
  },

  loadMap: function (mapData) {
    console.log('Carregando mapa ' + mapData.Map.Metadata.Name + '.');

    if (mapData) {
      if (mapData.Map && mapData.Map.Objects && mapData.Map.Objects.MapObject) {
        let loadedVehicles = 0, loadedProps = 0;

        _.forEach(mapData.Map.Objects.MapObject, function (object: any) {
          switch (object.Type) {
            case 'Prop':
              mp.objects.new(
                parseInt(object.Hash),
                new mp.Vector3(parseFloat(object.Position.X), parseFloat(object.Position.Y), parseFloat(object.Position.Z)));
              ++loadedProps;
              break;
            case 'Vehicle':
              mp.vehicles.new(
                parseInt(object.Hash),
                new mp.Vector3(parseFloat(object.Position.X), parseFloat(object.Position.Y), parseFloat(object.Position.Z))
              );
              ++loadedVehicles;
              break;
            default:
              console.log('Objeto do tipo ' + object.Type + ' não pôde ser carregado.');
          }
        });

        console.log(mapData.Map.Objects.MapObject.length + ' objetos carregados (' + loadedVehicles + ' veículos, ' + loadedProps + ' objetos).');
      } else {
        console.log('O mapa ' + mapData.Map.Metadata.id + ' não implementa um ou várias propriedades como Map, Map.Objects ou Map.Objects.MapObject.');
      }
    } else {
      console.log('Mapa ' + mapData.Map.Metadata.id + ' não encontrado.');
    }
  },

  unloadCurrentMap: function () {
    console.log('Descarregando mapa atual.');

    let objectsLength = mp.objects.toArray().length;
    let vehiclesLength = mp.vehicles.toArray().length;

    mp.objects.forEach(function (object) {
      object.destroy();
    })

    mp.vehicles.forEach(function (vehicle) {
      vehicle.destroy();
    });

    console.log(objectsLength + ' objetos descarregados.');
    console.log(vehiclesLength + ' veículos descarregados.');
  },

  mainLoop: function () {
    switch (this.status) {
      case StatusConsts.WAITING_PLAYERS:
        console.log('Aguardando jogadores');
        if (mp.players.length >= MinigamesConsts.MINIMUM_PLAYERS) {
          this.mapSelected = this.randomMinigame();
          this.status = StatusConsts.STARTING;
        }
        break;
      case StatusConsts.STARTING:
        console.log('Iniciando minigame ' + this.getMapMetadata('Name'));
        this.unloadCurrentMap();
        this.loadMinigame(this.mapSelected);
        this.status = StatusConsts.IN_PROGRESS;
        break;
      case StatusConsts.IN_PROGRESS:
        console.log('Minigame ' + this.getMapMetadata('Name') + ' em progresso.');
        break;
      case StatusConsts.FINISHED:
        console.log('Minigame ' + this.getMapMetadata('Name') + ' finalizado.');
        this.mapSelected = this.randomMinigame();
        this.status = StatusConsts.STARTING;
        break;
    }

    var self = this;
    setTimeout(function () {
      self.mainLoop()
    }, 1000);
  },

  randomMinigame: function () {
    return this.maps[Math.round(Math.random() * this.maps.length - 1)];
  },

  getMapMetadata: function (property) {
    return this.mapSelected['Map']['Metadata'][property];
  }
}
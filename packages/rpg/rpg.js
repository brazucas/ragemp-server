"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const glob = require("glob");
require("rxjs/add/observable/of");
const _ = require("underscore");
const rpg_consts_1 = require("./consts/rpg-consts");
const status_1 = require("./consts/status");
class Rpg {
    constructor(brazucasServer) {
        this.maps = [];
        this.mapSelected = null;
        this.status = null;
        this.brazucasServer = brazucasServer;
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loadMaps();
            console.log(this.getMaps().length + ' minigame(s) encontrado(s).');
            this.status = status_1.StatusConsts.WAITING_PLAYERS;
            this.mainLoop();
        });
    }
    loadMaps() {
        let maps = glob.sync('packages/rpg/maps/*.json');
        let self = this;
        _.forEach(maps, function (map) {
            self.maps.push(JSON.parse(fs.readFileSync(map, 'utf8')));
        });
    }
    getMaps() {
        return this.maps;
    }
    loadMinigame(map) {
        console.log('Carregando Minigame ' + map.Map.Metadata.Name + '.');
        this.loadMap(map);
    }
    loadMap(mapData) {
        console.log('Carregando mapa ' + mapData.Map.Metadata.Name + '.');
        if (mapData) {
            if (mapData.Map && mapData.Map.Objects && mapData.Map.Objects.MapObject) {
                let loadedVehicles = 0, loadedProps = 0;
                _.forEach(mapData.Map.Objects.MapObject, function (object) {
                    switch (object.Type) {
                        case 'Prop':
                            mp.objects.new(parseInt(object.Hash, 10), new mp.Vector3(parseFloat(object.Position.X), parseFloat(object.Position.Y), parseFloat(object.Position.Z)));
                            ++loadedProps;
                            break;
                        case 'Vehicle':
                            mp.vehicles.new(parseInt(object.Hash, 10), new mp.Vector3(parseFloat(object.Position.X), parseFloat(object.Position.Y), parseFloat(object.Position.Z)));
                            ++loadedVehicles;
                            break;
                        default:
                            console.log('Objeto do tipo ' + object.Type + ' não pôde ser carregado.');
                    }
                });
                console.log(mapData.Map.Objects.MapObject.length + ' objetos carregados (' + loadedVehicles + ' veículos, ' + loadedProps + '' +
                    'objetos).');
            }
            else {
                console.log('O mapa ' + mapData.Map.Metadata.id + ' não implementa um ou várias propriedades como Map, Map.Objects ou ' +
                    'Map.Objects.MapObject.');
            }
        }
        else {
            console.log('Mapa ' + mapData.Map.Metadata.id + ' não encontrado.');
        }
    }
    unloadCurrentMap() {
        console.log('Descarregando mapa atual.');
        let objectsLength = mp.objects.toArray().length;
        let vehiclesLength = mp.vehicles.toArray().length;
        mp.objects.forEach(function (object) {
            object.destroy();
        });
        mp.vehicles.forEach(function (vehicle) {
            vehicle.destroy();
        });
        console.log(objectsLength + ' objetos descarregados.');
        console.log(vehiclesLength + ' veículos descarregados.');
    }
    mainLoop() {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.status) {
                case status_1.StatusConsts.WAITING_PLAYERS:
                    console.log('Aguardando jogadores');
                    if (mp.players.length >= rpg_consts_1.RpgConsts.MINIMUM_PLAYERS) {
                        this.mapSelected = this.randomMinigame();
                        this.status = status_1.StatusConsts.STARTING;
                    }
                    break;
                case status_1.StatusConsts.STARTING:
                    console.log('Iniciando minigame ' + this.getMapMetadata('Name'));
                    this.unloadCurrentMap();
                    this.loadMinigame(this.mapSelected);
                    this.status = status_1.StatusConsts.IN_PROGRESS;
                    break;
                case status_1.StatusConsts.IN_PROGRESS:
                    console.log('Minigame ' + this.getMapMetadata('Name') + ' em progresso.');
                    break;
                case status_1.StatusConsts.FINISHED:
                    console.log('Minigame ' + this.getMapMetadata('Name') + ' finalizado.');
                    this.mapSelected = this.randomMinigame();
                    this.status = status_1.StatusConsts.STARTING;
                    break;
            }
            let self = this;
            setTimeout(function () {
                self.mainLoop();
            }, 1000);
        });
    }
    randomMinigame() {
        return this.maps[Math.round(Math.random() * this.maps.length - 1)];
    }
    getMapMetadata(property) {
        return this.mapSelected['Map']['Metadata'][property];
    }
}
exports.Rpg = Rpg;
//# sourceMappingURL=rpg.js.map
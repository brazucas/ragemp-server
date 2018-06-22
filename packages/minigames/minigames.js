"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glob = require("glob");
var fs = require("fs");
var _ = require("underscore");
var status_1 = require("./consts/status");
var minigames_1 = require("./consts/minigames");
var Minigames = (function () {
    function Minigames(brazucasServer) {
        this.maps = [];
        this.mapSelected = null;
        this.status = null;
        this.brazucasServer = brazucasServer;
        this.brazucasServer.loadPlayer('Mandrakke_Army')
            .subscribe(function (player) {
            console.log('>>> player ', player);
        }, function (error) {
            console.log('>>> error ', error);
        });
        this.loadMaps();
        console.log(this.getMaps().length + ' minigame(s) encontrado(s).');
        this.status = status_1.StatusConsts.WAITING_PLAYERS;
        this.mainLoop();
    }
    Minigames.prototype.loadMaps = function () {
        var maps = glob.sync("packages/minigames/maps/*.json");
        var self = this;
        _.forEach(maps, function (map) {
            self.maps.push(JSON.parse(fs.readFileSync(map, 'utf8')));
        });
    };
    Minigames.prototype.getMaps = function () {
        return this.maps;
    };
    Minigames.prototype.loadMinigame = function (map) {
        console.log('Carregando Minigame ' + map.Map.Metadata.Name + '.');
        this.loadMap(map);
    };
    Minigames.prototype.loadMap = function (mapData) {
        console.log('Carregando mapa ' + mapData.Map.Metadata.Name + '.');
        if (mapData) {
            if (mapData.Map && mapData.Map.Objects && mapData.Map.Objects.MapObject) {
                var loadedVehicles_1 = 0, loadedProps_1 = 0;
                _.forEach(mapData.Map.Objects.MapObject, function (object) {
                    switch (object.Type) {
                        case 'Prop':
                            mp.objects.new(parseInt(object.Hash), new mp.Vector3(parseFloat(object.Position.X), parseFloat(object.Position.Y), parseFloat(object.Position.Z)));
                            ++loadedProps_1;
                            break;
                        case 'Vehicle':
                            mp.vehicles.new(parseInt(object.Hash), new mp.Vector3(parseFloat(object.Position.X), parseFloat(object.Position.Y), parseFloat(object.Position.Z)));
                            ++loadedVehicles_1;
                            break;
                        default:
                            console.log('Objeto do tipo ' + object.Type + ' não pôde ser carregado.');
                    }
                });
                console.log(mapData.Map.Objects.MapObject.length + ' objetos carregados (' + loadedVehicles_1 + ' veículos, ' + loadedProps_1 + ' objetos).');
            }
            else {
                console.log('O mapa ' + mapData.Map.Metadata.id + ' não implementa um ou várias propriedades como Map, Map.Objects ou Map.Objects.MapObject.');
            }
        }
        else {
            console.log('Mapa ' + mapData.Map.Metadata.id + ' não encontrado.');
        }
    };
    Minigames.prototype.unloadCurrentMap = function () {
        console.log('Descarregando mapa atual.');
        var objectsLength = mp.objects.toArray().length;
        var vehiclesLength = mp.vehicles.toArray().length;
        mp.objects.forEach(function (object) {
            object.destroy();
        });
        mp.vehicles.forEach(function (vehicle) {
            vehicle.destroy();
        });
        console.log(objectsLength + ' objetos descarregados.');
        console.log(vehiclesLength + ' veículos descarregados.');
    };
    Minigames.prototype.mainLoop = function () {
        switch (this.status) {
            case status_1.StatusConsts.WAITING_PLAYERS:
                console.log('Aguardando jogadores');
                if (mp.players.length >= minigames_1.MinigamesConsts.MINIMUM_PLAYERS) {
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
        var self = this;
        setTimeout(function () {
            self.mainLoop();
        }, 1000);
    };
    Minigames.prototype.randomMinigame = function () {
        return this.maps[Math.round(Math.random() * this.maps.length - 1)];
    };
    Minigames.prototype.getMapMetadata = function (property) {
        return this.mapSelected['Map']['Metadata'][property];
    };
    return Minigames;
}());
exports.Minigames = Minigames;
//# sourceMappingURL=minigames.js.map
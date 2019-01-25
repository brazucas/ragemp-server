"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var glob = require("glob");
var fs = require("fs");
var _ = require("underscore");
var status_1 = require("./consts/status");
var rpg_1 = require("./consts/rpg");
require("rxjs/add/observable/of");
var Rpg = (function () {
    function Rpg(brazucasServer) {
        this.maps = [];
        this.mapSelected = null;
        this.status = null;
        this.brazucasServer = brazucasServer;
        this.init();
    }
    Rpg.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var jogador;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.brazucasServer.loadPlayer('Mandrakke_Army')];
                    case 1:
                        jogador = _a.sent();
                        console.log('>>>> ', jogador.nome);
                        this.loadMaps();
                        console.log(this.getMaps().length + ' minigame(s) encontrado(s).');
                        this.status = status_1.StatusConsts.WAITING_PLAYERS;
                        this.mainLoop();
                        return [2 /*return*/];
                }
            });
        });
    };
    Rpg.prototype.loadMaps = function () {
        var maps = glob.sync("packages/rpg/maps/*.json");
        var self = this;
        _.forEach(maps, function (map) {
            self.maps.push(JSON.parse(fs.readFileSync(map, 'utf8')));
        });
    };
    Rpg.prototype.getMaps = function () {
        return this.maps;
    };
    Rpg.prototype.loadMinigame = function (map) {
        console.log('Carregando Minigame ' + map.Map.Metadata.Name + '.');
        this.loadMap(map);
    };
    Rpg.prototype.loadMap = function (mapData) {
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
    Rpg.prototype.unloadCurrentMap = function () {
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
    Rpg.prototype.mainLoop = function () {
        switch (this.status) {
            case status_1.StatusConsts.WAITING_PLAYERS:
                console.log('Aguardando jogadores');
                if (mp.players.length >= rpg_1.RpgConsts.MINIMUM_PLAYERS) {
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
    Rpg.prototype.randomMinigame = function () {
        return this.maps[Math.round(Math.random() * this.maps.length - 1)];
    };
    Rpg.prototype.getMapMetadata = function (property) {
        return this.mapSelected['Map']['Metadata'][property];
    };
    return Rpg;
}());
exports.Rpg = Rpg;
//# sourceMappingURL=rpg.js.map
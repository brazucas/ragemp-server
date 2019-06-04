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
const bootstrap_1 = require("./lib/functions/bootstrap");
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
            this.carregarMapas();
            console.log(`${this.maps.length} mapa(s) carregado(s).`);
            yield bootstrap_1.carregarVeiculos();
            console.log(`${mp.vehicles.length} veículos carregados.`);
            yield bootstrap_1.carregarTimers(this.brazucasServer);
            this.mainLoop();
        });
    }
    carregarArquivosMapas() {
        let maps = glob.sync('packages/rpg/maps/*.json');
        let self = this;
        _.forEach(maps, function (map) {
            self.maps.push(JSON.parse(fs.readFileSync(map, 'utf8')));
        });
        return this.maps;
    }
    carregarMapas() {
        let mapas = this.carregarArquivosMapas();
        mapas.forEach((mapa) => {
            // this.carregarMapa(mapa);
        });
    }
    carregarMapa(mapData) {
        console.log(`Carregando mapa ${mapData.Map.Metadata.Name}.`);
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
                            console.log(`Objeto do tipo ${object.Type} não pôde ser carregado.`);
                    }
                });
                console.log(`${mapData.Map.Objects.MapObject.length} objetos carregados (${loadedVehicles} veículos, ${loadedProps}
          objetos)`);
            }
            else {
                console.log(`O mapa ${mapData.Map.Metadata.id} não implementa um ou várias propriedades como Map, Map.Objects ou
          Map.Objects.MapObject.`);
            }
        }
        else {
            console.log(`Mapa ${mapData.Map.Metadata.id} não encontrado.`);
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
            // console.log('[MAINLOOP] Executando mainloop');
            switch (this.status) {
            }
            let self = this;
            setTimeout(function () {
                self.mainLoop();
            }, 1000);
        });
    }
    getMapMetadata(property) {
        return this.mapSelected['Map']['Metadata'][property];
    }
}
exports.Rpg = Rpg;
//# sourceMappingURL=rpg.js.map
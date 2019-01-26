import * as fs from 'fs';
import * as glob from 'glob';
import 'rxjs/add/observable/of';
import * as _ from 'underscore';
import { BrazucasServer } from '../../common/brazucas-server';

declare const mp: Mp;

export class Rpg {
  public maps: Array<any> = [];
  public mapSelected: any = null;
  public status: any = null;
  public brazucasServer: BrazucasServer;

  constructor(brazucasServer: BrazucasServer) {
    this.brazucasServer = brazucasServer;

    this.init();
  }

  private async init() {
    this.loadMaps();
    console.log(this.getMaps().length + ' mapa(s) encontrado(s).');

    this.mainLoop();
  }

  public loadMaps() {
    let maps = glob.sync('packages/rpg/maps/*.json');

    let self = this;
    _.forEach(maps, function (map: Buffer) {
      self.maps.push(JSON.parse(fs.readFileSync(map, 'utf8')));
    });
  }

  public getMaps() {
    return this.maps;
  }

  public loadMap(mapData) {
    console.log('Carregando mapa ' + mapData.Map.Metadata.Name + '.');

    if (mapData) {
      if (mapData.Map && mapData.Map.Objects && mapData.Map.Objects.MapObject) {
        let loadedVehicles = 0, loadedProps = 0;

        _.forEach(mapData.Map.Objects.MapObject, function (object: any) {
          switch (object.Type) {
            case 'Prop':
              mp.objects.new(
                parseInt(object.Hash, 10),
                new mp.Vector3(parseFloat(object.Position.X), parseFloat(object.Position.Y), parseFloat(object.Position.Z)));
              ++loadedProps;
              break;
            case 'Vehicle':
              mp.vehicles.new(
                parseInt(object.Hash, 10),
                new mp.Vector3(parseFloat(object.Position.X), parseFloat(object.Position.Y), parseFloat(object.Position.Z)),
              );
              ++loadedVehicles;
              break;
            default:
              console.log('Objeto do tipo ' + object.Type + ' não pôde ser carregado.');
          }
        });

        console.log(mapData.Map.Objects.MapObject.length + ' objetos carregados (' + loadedVehicles + ' veículos, ' + loadedProps + '' +
          'objetos).');
      } else {
        console.log('O mapa ' + mapData.Map.Metadata.id + ' não implementa um ou várias propriedades como Map, Map.Objects ou ' +
          'Map.Objects.MapObject.');
      }
    } else {
      console.log('Mapa ' + mapData.Map.Metadata.id + ' não encontrado.');
    }
  }

  public unloadCurrentMap() {
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

  private async mainLoop() {
    // console.log('[MAINLOOP] Executando mainloop');

    switch (this.status) {

    }

    let self = this;
    setTimeout(function () {
      self.mainLoop();
    }, 1000);
  }

  public getMapMetadata(property) {
    return this.mapSelected['Map']['Metadata'][property];
  }
}

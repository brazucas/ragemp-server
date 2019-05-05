import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MpVeiculoCorInterface } from '../interfaces/mp.veiculo-cor.interface';
import { RPGVeiculo } from '../interfaces/veiculo.interface';

export class VeiculoProvider {
  private static veiculosArmazenados: Array<RPGVeiculo> = [];
  public static veiculos: BehaviorSubject<RPGVeiculo>;

  public static findFromMp(vehicle: VehicleMp) {
    return VeiculoProvider.veiculosArmazenados.find((rpgVeiculo) => rpgVeiculo.mp === vehicle);
  }

  public static salvar(vehicle: VehicleMp) {
    return new Observable((resolver) => {
      let rpgVeiculo = VeiculoProvider.findFromMp(vehicle);

      if (rpgVeiculo) {
        rpgVeiculo.storage.placaExibido = vehicle.numberPlate;
        rpgVeiculo.storage.trancado = vehicle.locked;
        [rpgVeiculo.storage.corPrimariaR, rpgVeiculo.storage.corPrimariaG, rpgVeiculo.storage.corPrimariaB] = vehicle.getColorRGB(MpVeiculoCorInterface.PRIMARIA);
        [rpgVeiculo.storage.corSecundariaR, rpgVeiculo.storage.corSecundariaG, rpgVeiculo.storage.corSecundariaB] = vehicle.getColorRGB(MpVeiculoCorInterface.SECUNDARIA);
        rpgVeiculo.storage.modelo = vehicle.model.toString();
        rpgVeiculo.storage.motor = vehicle.engine;
        rpgVeiculo.storage.mundo = vehicle.dimension;
        rpgVeiculo.storage.rotacao = vehicle.heading;
        rpgVeiculo.storage.transparencia = vehicle.alpha;

        resolver.next(rpgVeiculo.storage.save());
        resolver.complete();
      } else {
        resolver.error(`[VeiculoProvider - salvar] Veículo ID ${vehicle.id} não encontrado nos veículos armazenados.`);
      }
    });
  }

  public static estacionar(vehicle: VehicleMp) {
    return new Observable((resolver) => {
      let rpgVeiculo = VeiculoProvider.findFromMp(vehicle);

      if (rpgVeiculo) {
        rpgVeiculo.storage.posicaoX = vehicle.position.x;
        rpgVeiculo.storage.posicaoY = vehicle.position.y;
        rpgVeiculo.storage.posicaoZ = vehicle.position.z;
        rpgVeiculo.storage.rotacao = vehicle.heading;

        resolver.next(rpgVeiculo.storage.save());
        resolver.complete();
      } else {
        resolver.error(`[VeiculoProvider - estacionar] Veículo ID ${vehicle.id} não encontrado nos veículos armazenados.`);
      }
    });
  }

  public init() {
    VeiculoProvider.veiculos.subscribe((rpgVeiculo) => {
      VeiculoProvider.veiculosArmazenados.push(rpgVeiculo);
    });
  }
}

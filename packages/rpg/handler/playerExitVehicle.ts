import { BrazucasServer } from '../../../common/brazucas-server';
import { notificarTodos } from '../lib/functions/player';
import { VeiculoProvider } from '../providers/veiculo.provider';

export function PlayerExitVehicle (brazucasServer: BrazucasServer, vehicle: VehicleMp) {
  VeiculoProvider.estacionar(vehicle);
}

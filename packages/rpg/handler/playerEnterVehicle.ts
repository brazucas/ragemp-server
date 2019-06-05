import { BrazucasServer } from '../../../common/brazucas-server';
import { notificarTodos } from '../lib/functions/player';
import { VeiculoProvider } from '../providers/veiculo.provider';

export function PlayerEnterVehicle (brazucasServer: BrazucasServer, vehicle: VehicleMp, seat: number) {
  VeiculoProvider.estacionar(vehicle);
}

import { BrazucasServer } from '../../../common/brazucas-server';
import { VeiculoProvider } from '../providers/veiculo.provider';

export function PlayerEnterVehicle(brazucasServer: BrazucasServer, vehicle: VehicleMp, seat: number) {
  VeiculoProvider.estacionar(vehicle);
}

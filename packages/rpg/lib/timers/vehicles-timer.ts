import { BrazucasServer } from '../../../../common/brazucas-server';
import { VeiculoProvider } from '../../providers/veiculo.provider';

export class VehiclesTimer {
  protected brazucasServer: BrazucasServer;

  constructor(brazucasServer: BrazucasServer) {
    this.brazucasServer = brazucasServer;

    setInterval(() => {
      this.atualizarPosicoes();
    }, 5000);
  }

  private atualizarPosicoes() {
    mp.vehicles.forEach((vehicle) => {
      VeiculoProvider.estacionar(vehicle);
    });
  }
}

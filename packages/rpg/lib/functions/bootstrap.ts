///<reference path="../../../../node_modules/@types/ragemp-s/index.d.ts" />

import { BrazucasServer } from '../../../../common/brazucas-server';
import { Veiculo } from '../../../../common/database/models/Veiculo';
import { Veiculos } from '../../../../common/util/vehicles';
import { VeiculoProvider } from '../../providers/veiculo.provider';
import { VehiclesTimer } from '../timers/vehicles-timer';

declare const mp: Mp;

export async function carregarVeiculos() {
  let veiculos = await Veiculo.findAll();

  veiculos.forEach((veiculo) => {
    console.log('>>> criando veiculo ', veiculo.posicaoX, typeof veiculo.posicaoX);
    const veiculoMp = mp.vehicles.new(Veiculos[veiculo.modelo], new mp.Vector3(
      parseFloat(veiculo.posicaoX),
      parseFloat(veiculo.posicaoY),
      parseFloat(veiculo.posicaoZ)
    ));

    veiculoMp.setColorRGB(veiculo.corPrimariaR, veiculo.corPrimariaG, veiculo.corPrimariaB, veiculo.corSecundariaR,
      veiculo.corSecundariaG, veiculo.corSecundariaB);

    veiculoMp.locked = veiculo.trancado;
    veiculoMp.engine = veiculo.motor;
    // veiculoMp.dimension = veiculo.mundo;
    veiculoMp.numberPlate = veiculo.placaExibido;

    veiculoMp.spawn(veiculoMp.position, 0);

    VeiculoProvider.veiculos.next({
      mp: veiculoMp,
      storage: veiculo,
    });
  });
}

export async function carregarTimers(brazucasServer: BrazucasServer) {
  new VehiclesTimer(brazucasServer);
}

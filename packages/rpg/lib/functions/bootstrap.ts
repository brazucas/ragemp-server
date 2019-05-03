///<reference path="../../../../node_modules/@types/ragemp-s/index.d.ts" />

import { Veiculo } from '../../../../common/database/models/Veiculo';
import { VeiculoProvider } from '../../providers/veiculo.provider';

declare const mp: Mp;

export async function carregarVeiculos() {
  let veiculos = await Veiculo.findAll();

  veiculos.forEach((veiculo) => {
    let veiculoMp = mp.vehicles.new(veiculo.modelo, new mp.Vector3(veiculo.posicaoX, veiculo.posicaoY, veiculo.posicaoZ));

    veiculoMp.setColorRGB(veiculo.corPrimariaR, veiculo.corPrimariaG, veiculo.corPrimariaB, veiculo.corSecundariaR,
      veiculo.corSecundariaG, veiculo.corSecundariaB);

    veiculoMp.locked = veiculo.trancado;
    veiculoMp.engine = veiculo.motor;
    veiculoMp.dimension = veiculo.mundo;
    veiculoMp.numberPlate = veiculo.placaExibido;

    VeiculoProvider.veiculos.next({
      mp: veiculoMp,
      storage: veiculo,
    });
  });
}
